/*import { BranchDocument, BranchModel } from "../models/branch.model";
import { GraphDocument } from "../models/graph.model";
import { UserDocument } from "../models/user.model";

// creates branch for user
// if user already has a branch, does nothing
export const createBranch = async (
  owner: UserDocument,
  graph: GraphDocument
): Promise<BranchDocument> => {
  const filter = { graph: graph._id, owner: owner._id };
  const update = {};

  const doc = await BranchModel.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  }).exec();

  return doc;
};
*/
