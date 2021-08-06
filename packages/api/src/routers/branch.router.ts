import express from "express";
import { getBranchExpressions, getGraphFromBranch, updateBranchExpressions, validateBranchOwner } from "../controllers/branch.controller";
import { validateCollaborator, validateOwner } from "../controllers/graph.controller";
import { googleAuth } from "../tokenAuth";
import { HTTPError, handleHTTPError, isStringArray } from "./util";

const router = express.Router();

router.get("/:branchID/expressions", googleAuth, async (req, res) => {
  try {
    const { branchID } = req.params;
    if (!branchID) throw new HTTPError(404);

    const graph = await getGraphFromBranch(branchID);
    if (!graph) throw new HTTPError(404);

    // user must be owner or collaborator
    const isOwner = await validateOwner(graph.id, req.appData.user.email);
    const isCollaborator = await validateCollaborator(graph.id, req.appData.user.email);
    if (!isOwner && !isCollaborator) throw new HTTPError(403);

    const expressions = await getBranchExpressions(branchID);
    if (!expressions) throw new HTTPError(404);

    res.status(200).json({ expressions: expressions }).end();
  } catch (err) {
    console.log(err.stack);
    handleHTTPError(err, res);
  }
});

router.put("/:branchID/expressions", googleAuth, async (req, res) => {
  try {
    const { branchID } = req.params;
    const { expressions } = req.body;
    if (!branchID || !isStringArray(expressions)) throw new HTTPError(404);

    // make sure that the user is allowed to access this branch
    const isBranchOwner = await validateBranchOwner(branchID, req.appData.user.email);
    if (!isBranchOwner)
      throw new HTTPError(403);

    const ok = await updateBranchExpressions(branchID, expressions);
    if (!ok) throw new HTTPError(404);

    res.status(200).end();
  } catch (err) {
    handleHTTPError(err, res);
  }
})

export { router as branchRouter };