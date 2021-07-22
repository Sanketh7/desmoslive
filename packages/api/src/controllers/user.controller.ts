import { Types } from "mongoose";
import { GraphDocument } from "../models/graph.model";
import { User, UserDocument, UserModel } from "../models/user.model";

// creates a new user document
// if a user with that email address already exists, no document is created
// note that if the name was changed, this will be updated by upserting
export const createUser = async (
  name: string,
  email: string
): Promise<UserDocument> => {
  const filter = { email: email };
  const update = { name: name }; // updates name just in case that changed

  const doc = await UserModel.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  }).exec();

  return doc;
};

export const getUserByEmail = async (
  email: string
): Promise<UserDocument | null> => {
  return await UserModel.findOne({ email: email }).exec();
};

export const getUser = async (user: User): Promise<UserDocument | null> => {
  return await UserModel.findOne(user).exec();
};

export const getMyGraphsID = (
  userDoc: UserDocument
): Types.ObjectId[] | undefined => {
  return userDoc.myGraphs;
};

export const addToMyGraphs = async (
  userDoc: UserDocument,
  graphDoc: GraphDocument
): Promise<void> => {
  if (graphDoc.owner != userDoc._id) return;
  await userDoc.updateOne({ $push: { myGraphs: graphDoc._id } }).exec(); // TODO: prevent duplicates
};

export const addToSharedGraphs = async (
  sharedUser: UserDocument,
  graphDoc: GraphDocument
): Promise<void> => {
  await sharedUser.updateOne({ $push: { sharedGraphs: graphDoc._id } }).exec(); // TODO: prevent duplicates
};
