import { Schema, Model, model } from "mongoose";

interface User {
    name: string;
    email: string;
}

const schema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
});

const UserModel: Model<User> = model<User>("User", schema);

export { User, UserModel };
