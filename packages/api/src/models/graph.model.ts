import { Document, model, Schema, Types } from "mongoose";
import { BranchDocument } from "./branch.model";

interface Graph {
  name: string;
  owner: Types.ObjectId;
  sharedWith: Types.ObjectId[];
  branches: Types.DocumentArray<BranchDocument>;
}

// eslint-disable-next-line prettier/prettier
interface GraphDocument extends Document, Graph { }

const GraphSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: "User", required: true },
  sharedWith: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  branches: [Branch]
});

const GraphModel = model<GraphDocument>("Graph", GraphSchema);

export { Graph, GraphDocument, GraphModel };
