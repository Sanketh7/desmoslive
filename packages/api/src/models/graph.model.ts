import { Document, model, Schema, Types } from "mongoose";
import { UserDocument } from "./user.model";

interface Graph {
  name: string;
  owner: Types.ObjectId | UserDocument;
  sharedWith: Types.ObjectId[];
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
});

const GraphModel = model<GraphDocument>("Graph", GraphSchema);

export { Graph, GraphDocument, GraphModel };
