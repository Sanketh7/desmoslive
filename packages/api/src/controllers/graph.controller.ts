import { Graph, GraphDocument, GraphModel } from "../models/graph.model";
import { UserDocument } from "../models/user.model";

export const createGraph = async (
  name: string,
  owner: UserDocument
): Promise<GraphDocument> => {
  const data: Graph = {
    name: name,
    owner: owner,
    sharedWith: [],
  };
  const graphDoc = await GraphModel.create(data);
  return graphDoc;
};

export const getGraph = async (graph: Graph): Promise<GraphDocument | null> => {
  return await GraphModel.findOne(graph).exec();
};

export const getGraphByID = async (
  graphID: string
): Promise<GraphDocument | null> => {
  return await GraphModel.findOne({ _id: graphID }).exec();
};
