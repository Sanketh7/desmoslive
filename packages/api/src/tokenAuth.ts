import express from "express";
import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";
import { getUser } from "./controllers/user.controller";
import { User, UserDocument } from "./models/user.model";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;

const oauthClient = new OAuth2Client(CLIENT_ID);

// add additional fields to Express.Request to use in middleware
interface RequestAppData {
  user: User;
  userDoc: UserDocument | null;
  authToken: string;
}
declare module "express-serve-static-core" {
  interface Request {
    appData: RequestAppData;
  }
}

/**
 * ExpressJS middleware to verify a Google Auth Token
 * 401 status if no token provided in HTTP Authorization Header
 * 403 status if failed to authenticate token
 * adds User, UserDocument, and Auth Token string to request for later use
 */
export const verifyGoogleAuthToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Needs authentication." });
    return;
  }
  try {
    const ticket: LoginTicket = await oauthClient.verifyIdToken({
      idToken: req.headers.authorization,
      audience: CLIENT_ID,
    });
    const { name, email } = ticket.getPayload() as TokenPayload;
    if (!name || !email) throw new Error();
    const userDoc = await getUser({ name: name, email: email });
    req.appData = {
      authToken: req.headers.authorization,
      user: { name: name, email: email },
      userDoc: userDoc,
    };
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Failed to authenticate." });
    return;
  }
};
