import express from "express";
import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";
import { getUserByEmail } from "./controllers/user.controller";
import { User } from "./models/user.model";
import { handleHTTPError, HTTPError } from "./routers/util";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;

export const oauthClient = new OAuth2Client(CLIENT_ID);

// add additional fields to Express.Request to use in middleware
interface RequestAppData {
  user: User;
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
export const googleAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    if (!req.headers.authorization) throw new HTTPError(401);

    const ticket: LoginTicket = await oauthClient.verifyIdToken({
      idToken: req.headers.authorization,
      audience: CLIENT_ID,
    });
    const { name, email } = ticket.getPayload() as TokenPayload;
    if (!name || !email) throw new HTTPError(401);

    const user = await getUserByEmail(email);
    if (!user) throw new HTTPError(401);

    req.appData = {
      authToken: req.headers.authorization,
      user: user,
    };

    next();
  } catch (err) {
    handleHTTPError(err, res);
  }
};
