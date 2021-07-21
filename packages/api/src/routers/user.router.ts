import express from "express";
import { findUserFromEmail } from "../controllers/user.controller";
import { verifyGoogleAuthToken } from "../tokenAuth";
import { User } from "../models/user.model";

const router = express.Router();

router.get("/user", verifyGoogleAuthToken, async (req, res) => {
  const userDoc = await findUserFromEmail(req.appData.user.email);
  userDoc == null ? res.status(404) : res.status(200).json(userDoc as User);
});

export { router as userRouter };
