import * as _ from "lodash";
import { getRepository } from "typeorm";
import { Branch } from "../models/branch.model";
import { Graph } from "../models/graph.model";
import { User } from "../models/user.model";

/**
 * creates a new branch
 * if a branch with the given graph and owner already exists, nothing happens
 * @param graph
 * @param owner owner of the branch
 */
export const createBranch = async (
  graph: Graph,
  owner: User
): Promise<void> => {
  // check if user already has a branch
  const oldBranch = await getRepository(Branch).findOne({
    relations: ["owner", "graph"],
    where: { owner: { email: owner.email }, graph: { id: graph.id } },
  });
  if (oldBranch) return;

  const branchRepo = getRepository(Branch);
  const branch = new Branch();
  branch.owner = owner;
  branch.graph = graph;
  branch.expressions = [];
  await branchRepo.save(branch);
};

export const getUsersBranchID = async (graphID: string, email: string): Promise<string | undefined> => {
  const branch = await getRepository(Branch).findOne({
    relations: ["owner", "graph"],
    where: { owner: { email: email }, graph: { id: graphID } },
  });
  return branch && branch.id ? branch.id : undefined;
}

export const getBranchExpressions = async (branchID: string): Promise<string[] | undefined> => {
  const branch = await getRepository(Branch).findOne(branchID);
  return branch && branch.expressions ? branch.expressions : undefined;
}

export const updateBranchExpressions = async (
  branchID: string,
  expressions: string[]
): Promise<boolean> => {
  const branchRepo = getRepository(Branch);
  const branch = await branchRepo.findOne(branchID);
  if (!branch) return false;
  branch.expressions = expressions;
  branchRepo.save(branch);
  return true;
};

export const getGraphFromBranch = async (branchID: string): Promise<Graph | undefined> => {
  const branch = await getRepository(Branch).findOne(branchID, { relations: ["graph"] });
  return branch && branch.graph ? branch.graph : undefined;
};

export const validateBranchOwner = async (branchID: string, email: string): Promise<boolean> => {
  const branch = await getRepository(Branch).findOne(branchID, { relations: ["owner"] });
  return Boolean(branch && branch.owner.email === email);
};

export const mergeBranchExpressions = async (srcBranchID: string, targetBranchID: string): Promise<boolean> => {
  const branchRepo = getRepository(Branch);
  const srcBranch = await branchRepo.findOne(srcBranchID);
  const targetBranch = await branchRepo.findOne(targetBranchID);
  if (!srcBranch || !targetBranch) return false;

  targetBranch.expressions = _.union(srcBranch.expressions, targetBranch.expressions);
  branchRepo.save(targetBranch);
  return true;
};