import { getConnection, getRepository } from "typeorm";
import { Graph } from "../models/graph.model";
import { User } from "../models/user.model";
import { HTTPError } from "../routers/util";

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
  // first check if the collaborator already exists
  const loadedGraph = await getRepository(Graph).findOne(graph.id, { relations: ["sharedWith"] });
  if (!loadedGraph) throw new HTTPError(404);
  let collabExists = false;
  loadedGraph.sharedWith.forEach(user => {
    collabExists = collabExists || (user.email === collaborator.email)
  })
  if (collabExists) return;

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
  const oldGraph = await getRepository(Graph).findOne({ name: graphName, owner: { email: owner.email } },
    { relations: ["owner"] })
  if (oldGraph) return oldGraph;

  const graphRepo = getRepository(Graph);
  const graph = new Graph();
  graph.name = graphName;
  graph.owner = owner;
  graph.branches = [];
  graph.sharedWith = [];
  graphRepo.save(graph);

  return graph;
};

export const deleteGraph = async (graphID: string): Promise<boolean> => {
  //await getRepository(Graph).createQueryBuilder().delete().from(Graph).where("id = :id", { id: graphID }).execute();
  const graph = await getRepository(Graph).findOne(graphID);
  if (!graph) return false;
  await getRepository(Graph).remove(graph);
  return true;
}

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

export const validateCollaborator = async (graphID: string, email: string) => {
  const graph = await getRepository(Graph).findOne(graphID, { relations: ["sharedWith"] });
  return graph !== undefined && graph.sharedWith.map(user => user.email === email).reduce((prev, curr, ind) => prev || curr, false);
}