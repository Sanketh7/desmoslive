import { getConnection, getRepository } from "typeorm";
import { Graph } from "../models/graph.model";
import { User } from "../models/user.model";

/**
 * finds the Graph with the given id
 * @param id
 * @returns queried Graph or undefined if it doesn't exist
 */
export const getGraphByID = async (id: string): Promise<Graph | undefined> => {
  return await getRepository(Graph)
    .createQueryBuilder("graph")
    .where("graph.id = :id", { id })
    .getOne();
};

/**
 * shares the graph with the user by adding the user to the "sharedWith" column
 * @param graph
 * @param collaborator
 */
export const shareGraph = async (
  graph: Graph,
  collaborator: User
): Promise<void> => {
  await getConnection()
    .createQueryBuilder()
    .relation(Graph, "sharedWith")
    .of(graph)
    .add(collaborator);
};

/**
 * creates a new graph with the given owner and name
 * @param owner
 * @param graphName
 * @returns id of new Graph entity
 */
export const createGraph = async (
  owner: User,
  graphName: string
): Promise<Graph> => {
  // check if owner already has a graph with the same name
  if (owner && owner.myGraphs) {
    const oldGraph = owner.myGraphs.find((graph) => graph.name == graphName);
    if (oldGraph) return oldGraph;
  }

  const graphRepo = getRepository(Graph);
  const graph = new Graph();
  graph.name = graphName;
  graph.owner = owner;
  graph.branches = [];
  graph.sharedWith = [];
  graphRepo.save(graph);

  return graph;
};

export const validateOwner = async (
  graphID: string,
  email: string
): Promise<boolean> => {
  // load graph with relation
  const graph = await getRepository(Graph).findOne(graphID, {
    relations: ["owner"],
  });
  return graph !== undefined && graph.owner && graph.owner.email === email;
};
