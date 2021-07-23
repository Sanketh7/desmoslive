import { Schema, Types } from "mongoose";
import { GraphDocument } from "./graph.model";
import { UserDocument } from "./user.model";

interface Branch {
  owner: Types.ObjectId | UserDocument;
  graph: Types.ObjectId[] | GraphDocument;
  expressions: string[];
}

// eslint-disable-next-line prettier/prettier
interface BranchDocument extends Branch, Types.Subdocument { }

const BranchSchema = new Schema({
  owner: { type: Types.ObjectId, ref: "User", required: true },
  graph: { type: Types.ObjectId, ref: "Graph", required: true },
  expressions: [
    {
      type: String,
    },
  ],
});

// const BranchModel = model<BranchDocument>("Branch", BranchSchema);

export { Branch, BranchDocument, BranchSchema };
