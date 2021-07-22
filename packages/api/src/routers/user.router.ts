import express from "express";
import { getMyGraphsID } from "../controllers/user.controller";
import { verifyGoogleAuthToken } from "../tokenAuth";
import { Types } from "mongoose";
import { UserDocument } from "../models/user.model";

const router = express.Router();

router.get("/me", verifyGoogleAuthToken, async (req, res) => {
  req.appData.userDoc === null
    ? res.status(401)
    : res.status(200).json(req.appData.userDoc.toJSON());
});

router.get("/user/mygraphs", verifyGoogleAuthToken, async (req, res) => {
  const userDoc = req.appData.userDoc;
  if (!userDoc) {
    res.status(401);
    return;
  }
  const graphIDs = getMyGraphsID(userDoc as UserDocument);
  graphIDs === undefined
    ? res.status(404)
    : res.status(200).json(graphIDs as Types.ObjectId[]);
});

export { router as userRouter };
