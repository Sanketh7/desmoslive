import express from "express";
import { LoginTicket, TokenPayload } from "google-auth-library";
import { createUser } from "../controllers/user.controller";
import { oauthClient } from "../tokenAuth";
import { handleHTTPError, HTTPError } from "./util";

const router = express.Router();

/**
 * allows the user to login using Google OAuth
 * requires auth token to be in the authorization header
 * creates new user if it doesn't already exist
 * 401 if no auth token or error while verifying token
 */
router.post("/google", async (req, res) => {
  try {
    if (!req.headers.authorization) throw new HTTPError(401);

    const token = req.headers.authorization;
    const ticket: LoginTicket = await oauthClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID as string,
    });
    const { name, email } = ticket.getPayload() as TokenPayload;
    if (!name || !email) throw new HTTPError(401);

    const user = await createUser(email, name);
    res.status(200).json({ email: email }).end();
  } catch (err) {
    handleHTTPError(err, res);
  }
});

// TODO: logout route

export { router as authRouter };
