import { BranchDocument, BranchSchema } from "../models/branch.model";
import { Graph, GraphDocument, GraphModel } from "../models/graph.model";
import { UserDocument } from "../models/user.model";

export const createGraph = async (
  name: string,
  owner: UserDocument
): Promise<GraphDocument> => {
  const data: Graph = {
    name: name,
    owner: owner._id,
    sharedWith: [],
    branches: [],
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

export const createBranch = async (
  branchOwner: UserDocument,
  graph: GraphDocument
): Promise<void> => {
  await GraphModel.updateOne(
    {
      _id: graph._id,
      branches: {
        $not: {
          $elemMatch: {
            owner: branchOwner._id,
          },
        },
      },
    },
    {
      $addToSet: {
        branches: {
          owner: branchOwner._id,
          graph: graph._id,
          expressions: [],
        },
      },
    }
  ).exec();
};
