import express from "express";
import { createGraph, getGraphByID } from "../controllers/graph.controller";
import {
  addToMyGraphs,
  addToSharedGraphs,
  getUser,
  getUserByEmail,
} from "../controllers/user.controller";
import { UserDocument } from "../models/user.model";
import { verifyGoogleAuthToken } from "../tokenAuth";

const router = express.Router();

router.post("/creategraph", verifyGoogleAuthToken, async (req, res) => {
  const graphName: string | undefined = req.body.graphName;
  const userDoc: UserDocument | null = await getUser(req.appData.user);
  if (!graphName) {
    res.status(403).json({ message: "Field 'graphName' not found." });
    return;
  }
  if (!userDoc) {
    res.status(403).json({ message: "Invalid user." });
    return;
  }
  const graphDoc = await createGraph(graphName, userDoc as UserDocument);
  await addToMyGraphs(userDoc as UserDocument, graphDoc);
  res.status(200);
});

router.put("/sharewith", verifyGoogleAuthToken, async (req, res) => {
  const graphID: string | undefined = req.params.graphid;
  const email: string | undefined = req.params.email;
  if (!graphID || !email) {
    res.status(403).json({ message: "Invalid parameters." });
    return;
  }
  const graphDoc = await getGraphByID(graphID);
  if (!graphDoc) {
    res.status(403).json({ message: "Graph not found." });
    return;
  }
  const userDoc = await getUserByEmail(email);
  if (!userDoc) {
    res.status(403).json({ message: "User not found." });
    return;
  }
  await addToSharedGraphs(userDoc, graphDoc);
  res.status(200);
});

export { router as graphRouter };
