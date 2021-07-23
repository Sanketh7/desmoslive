import express from "express";
import {
  createBranch,
  createGraph,
  getGraphByID,
} from "../controllers/graph.controller";
import {
  addToMyGraphs,
  addToSharedGraphs,
  getUserByEmail,
} from "../controllers/user.controller";
import { UserDocument } from "../models/user.model";
import { verifyGoogleAuthToken } from "../tokenAuth";

const router = express.Router();

router.post("/create", verifyGoogleAuthToken, async (req, res) => {
  const graphName: string | undefined = req.body.graphName;
  const userDoc: UserDocument | null = req.appData.userDoc;
  if (!graphName) {
    res.status(403).json({ message: "Field 'graphName' not found." });
    return;
  }
  if (!userDoc) {
    res.status(401);
    return;
  }
  const graphDoc = await createGraph(graphName, userDoc as UserDocument);
  await addToMyGraphs(userDoc as UserDocument, graphDoc);
  res.status(200);
});

router.put("/:graphID/share", verifyGoogleAuthToken, async (req, res) => {
  const graphID: string | undefined = req.params.graphid;
  const email: string | undefined = req.query.email as string | undefined;
  const ownerDoc: UserDocument | null = req.appData.userDoc;
  if (!ownerDoc) {
    res.status(401);
    return;
  }
  if (!graphID || !email) {
    res.status(403).json({ message: "Invalid parameters." });
    return;
  }
  const graphDoc = await getGraphByID(graphID);
  if (!graphDoc) {
    res.status(403).json({ message: "Graph not found." });
    return;
  }
  const sharedUserDoc = await getUserByEmail(email);
  if (!sharedUserDoc) {
    res.status(403).json({ message: "User not found." });
    return;
  }
  // make sure that the user can share this graph
  // the user must be the graph owner
  if (graphDoc.owner !== ownerDoc._id) {
    res.status(401);
    return;
  }
  await addToSharedGraphs(sharedUserDoc, graphDoc);
  await createBranch(sharedUserDoc, graphDoc);
  res.status(200);
});

router.put(
  "/:graphid/mybranch/expressions",
  verifyGoogleAuthToken,
  async (req, res) => {
    const graphID: string | undefined = req.params.graphid;
    const userDoc: UserDocument | null = req.appData.userDoc;

    // get expressions list and validate that it's a string array
    const isStringArray = (value: any): boolean =>
      Array.isArray(value) && value.every((item) => typeof item === "string");
    const expressions: string[] | undefined = isStringArray(
      req.body.expressions
    )
      ? (req.body.expressions as string[])
      : undefined;

    if (!graphID) {
      res.status(403);
      return;
    }
    if (!expressions) {
      res.status(403).json({ message: "No expressions provided." });
      return;
    }
    const graphDoc = await getGraphByID(graphID);
    if (!graphDoc) {
      res.status(404).json({ message: "No graph found." });
      return;
    }
    if (!userDoc || graphDoc.owner !== userDoc._id) {
      res.status(401);
      return;
    }
  }
);

export { router as graphRouter };
