import express from "express";
import { Http2ServerRequest } from "http2";
import {
  createBranch,
  getBranchExpressions,
  getUsersBranchID,
} from "../controllers/branch.controller";
import {
  deleteGraph,
  getBranches,
  getGraphByID,
  renameGraph,
  shareGraph,
  validateCollaborator,
  validateOwner,
} from "../controllers/graph.controller";
import { getUserByEmail } from "../controllers/user.controller";
import { googleAuth } from "../tokenAuth";
import { handleHTTPError, HTTPError, isStringArray } from "./util";

const router = express.Router();

/**
 * shares graph (id = "graphID") with user (email = "email")
 * 404 if parameters are undefined or the collaborator isn't found
 * 403 if the user can't modify this graph
 */
router.put("/:graphID/share", googleAuth, async (req, res) => {
  try {
    const { graphID } = req.params;
    const { email } = req.body;
    if (!graphID || !email) throw new HTTPError(404);

    const graph = await getGraphByID(graphID);
    const collaborator = await getUserByEmail(email);
    if (!graph || !collaborator) throw new HTTPError(404);

    // make sure that the user is allowed to access this graph
    // only allowed to share graph if owner
    const allowed = await validateOwner(graphID, req.appData.user.email);
    if (!allowed)
      throw new HTTPError(403);

    await shareGraph(graph, collaborator);
    await createBranch(graph, collaborator);

    res.status(200).end();
  } catch (err) {
    handleHTTPError(err, res);
  }
});

router.get("/:graphID/branch/me/id", googleAuth, async (req, res) => {
  try {
    const graphID = req.params.graphID;
    if (!graphID) throw new HTTPError(404);

    // make sure that the user is allowed to access this graph
    // user needs to be owner or collaborator
    const isOwner = await validateOwner(graphID, req.appData.user.email);
    const isCollaborator = await validateCollaborator(graphID, req.appData.user.email);
    if (!isOwner && !isCollaborator)
      throw new HTTPError(403);

    const id = await getUsersBranchID(graphID, req.appData.user.email);
    if (!id) throw new HTTPError(404);

    res.status(200).json({ id: id }).end();
  } catch (err) {
    handleHTTPError(err, res);
  }
})

router.get("/:graphID/branches", googleAuth, async (req, res) => {
  try {
    const { graphID } = req.params;
    if (!graphID) throw new HTTPError(404);

    // user needs to be owner or collaborator
    const isOwner = await validateOwner(graphID, req.appData.user.email);
    const isCollaborator = await validateCollaborator(graphID, req.appData.user.email);
    if (!isOwner && !isCollaborator)
      throw new HTTPError(403);

    const branches = await getBranches(graphID);
    if (!branches) throw new HTTPError(404);

    const branchData = branches.map(branch => ({ id: branch.id, owner: { email: branch.owner.email } }));
    res.status(200).json({ branches: branchData }).end();
  } catch (err) {
    handleHTTPError(err, res);
  }
})

router.delete("/:graphID/delete", googleAuth, async (req, res) => {
  try {
    const graphID = req.params.graphID;
    if (!graphID) throw new HTTPError(404);

    // make sure the user is allowed to access this graph
    // user needs to be owner
    const isOwner = await validateOwner(graphID, req.appData.user.email);
    if (!isOwner)
      throw new HTTPError(403);

    const ok = await deleteGraph(graphID);
    if (!ok) throw new HTTPError(404);

    res.status(200).end();
  } catch (err) {
    handleHTTPError(err, res);
  }
});

router.put("/:graphID/rename", googleAuth, async (req, res) => {
  try {
    const { graphID } = req.params;
    const { graphName } = req.body;
    if (!graphID || !graphName) throw new HTTPError(404);

    // only owner can rename a graph
    const isOwner = await validateOwner(graphID, req.appData.user.email);
    if (!isOwner) throw new HTTPError(403);

    const ok = await renameGraph(graphID, graphName);
    if (!ok) throw new HTTPError(404);

    res.status(200).end();
  } catch (err) {
    handleHTTPError(err, res);
  };
});

export { router as graphRouter };