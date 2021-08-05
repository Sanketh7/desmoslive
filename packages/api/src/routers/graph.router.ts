import express from "express";
import { Http2ServerRequest } from "http2";
import {
  createBranch,
  getUsersExpressions,
  updateUsersExpressions,
} from "../controllers/branch.controller";
import {
  getGraphByID,
  shareGraph,
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
router.put("/:graphID/share/:email", googleAuth, async (req, res) => {
  try {
    const { graphID, email } = req.params;
    if (!graphID || !email) throw new HTTPError(404);

    const graph = await getGraphByID(graphID);
    const collaborator = await getUserByEmail(email);
    if (!graph || !collaborator) throw new HTTPError(404);

    // make sure that the user is allowed to access this graph
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

router.get("/:graphID/branch/me/expressions", googleAuth, async (req, res) => {
  try {
    const graphID = req.params.graphID;
    if (!graphID) throw new HTTPError(404);

    // make sure that the user is allowed to access this graph
    const allowed = await validateOwner(graphID, req.appData.user.email);
    if (!allowed)
      throw new HTTPError(403);

    const expressions = await getUsersExpressions(
      graphID,
      req.appData.user.email
    );
    if (!expressions) throw new HTTPError(404);

    res.status(200).json({ expressions: expressions }).end();
  } catch (err) {
    handleHTTPError(err, res);
  }
});

router.put("/:graphID/branch/me/expressions", googleAuth, async (req, res) => {
  try {
    const graphID = req.params.graphID;
    const expressions = req.body.expressions;
    if (!graphID || !isStringArray(expressions)) throw new HTTPError(404);

    // make sure that the user is allowed to access this graph
    const allowed = await validateOwner(graphID, req.appData.user.email);
    if (!allowed)
      throw new HTTPError(403);

    const ok = await updateUsersExpressions(
      graphID,
      req.appData.user.email,
      expressions
    );
    if (!ok) throw new HTTPError(404);

    res.status(200).end();
  } catch (err) {
    handleHTTPError(err, res);
  }
});

export { router as graphRouter };
