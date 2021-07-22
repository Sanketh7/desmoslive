import { Schema, Model, model, Document, Types } from "mongoose";

interface User {
  name: string;
  email: string;
  myGraphs: Types.ObjectId[];
  sharedGraphs: Types.ObjectId[];
}

// eslint-disable-next-line prettier/prettier
interface UserDocument extends Document, User { }

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  myGraphs: [
    {
      type: Types.ObjectId,
      ref: "Graph",
    },
  ],
  sharedGraphs: [
    {
      type: Types.ObjectId,
      ref: "Graph",
    },
  ],
});

const UserModel: Model<UserDocument> = model<UserDocument>("User", UserSchema);

export { User, UserDocument, UserModel };
