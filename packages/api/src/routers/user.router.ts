import express from "express";
import { getMyGraphsID } from "../controllers/user.controller";
import { verifyGoogleAuthToken } from "../tokenAuth";
import { Types } from "mongoose";

const router = express.Router();

router.get("/me", verifyGoogleAuthToken, async (req, res) => {
  req.appData.userDoc === null
    ? res.status(404)
    : res.status(200).json(req.appData.user);
});

router.get("/user/mygraphs", verifyGoogleAuthToken, async (req, res) => {
  if (req.appData.userDoc === null) {
    res.status(404);
    return;
  }
  const graphIDs = getMyGraphsID(req.appData.userDoc);
  graphIDs === undefined
    ? res.status(404)
    : res.status(200).json(graphIDs as Types.ObjectId[]);
});

export { router as userRouter };
