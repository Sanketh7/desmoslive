import { getRepository } from "typeorm";
import { Branch } from "../models/branch.model";
import { Graph } from "../models/graph.model";
import { User } from "../models/user.model";
import { getGraphByID } from "./graph.controller";

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
  const branchRepo = getRepository(Branch);
  const branch = new Branch();
  branch.owner = owner;
  branch.graph = graph;
  branch.expressions = [];
  await branchRepo.save(branch);
};

export const getUsersExpressions = async (
  graphID: string,
  email: string
): Promise<string[]> => {
  const branch = await getRepository(Branch).findOne({
    relations: ["owner", "graph"],
    where: { owner: { email: email }, graph: { id: graphID } },
  });
  return branch && branch.expressions ? branch.expressions : [];
};

export const updateUsersExpressions = async (
  graphID: string,
  email: string,
  expressions: string[]
): Promise<boolean> => {
  const branchRepo = getRepository(Branch);
  const branch = await branchRepo.findOne({
    relations: ["owner", "graph"],
    where: { owner: { email: email }, graph: { id: graphID } },
  });
  if (!branch) return false;
  branch.expressions = expressions;
  branchRepo.save(branch);
  return true;
};
