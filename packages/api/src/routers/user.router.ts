import express from "express";
import { createBranch } from "../controllers/branch.controller";
import { createGraph } from "../controllers/graph.controller";
import {
  getMyGraphsIDs,
  getSharedGraphsIDs,
} from "../controllers/user.controller";
import { googleAuth } from "../tokenAuth";
import { handleHTTPError, HTTPError } from "./util";

const router = express.Router();

router.get("/me", googleAuth, (req, res) => {
  res.status(501);
  // TODO
});

/**
 * returns a string[] of graph IDs for the user's graphs
 */
router.get("/me/myGraphs", googleAuth, async (req, res) => {
  const user = req.appData.user;
  const graphIDs = await getMyGraphsIDs(user.email);
  res.status(200).json({ myGraphs: graphIDs });
});

/**
 * returns a string[] for graph IDs for the user's shared graphs
 */
router.get("/me/sharedGraphs", googleAuth, async (req, res) => {
  const user = req.appData.user;
  const graphIDs = await getSharedGraphsIDs(user.email);
  res.status(200).json({ sharedGraphs: graphIDs }).end();
});

/**
 * creates a new graph with the specified name
 * creates a new branch in that graph for the user
 * 404 if the graph name is undefined
 */
router.post("/me/createGraph/:graphName", googleAuth, async (req, res) => {
  try {
    const graphName = req.params.graphName;
    if (!graphName) throw new HTTPError(404);

    // create graph and branch for owner
    const graph = await createGraph(req.appData.user, graphName);
    await createBranch(graph, req.appData.user);

    res.status(200).json({ id: graph.id }).end();
  } catch (err) {
    console.log(err.stack);
    handleHTTPError(err, res);
  }
});

export { router as userRouter };
