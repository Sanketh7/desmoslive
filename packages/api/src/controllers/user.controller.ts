import { UserDocument, UserModel } from "../models/user.model";

// creates a new user document
// if a user with that email address already exists, no document is created
// note that if the name was changed, this will be updated by upserting
export const createUser = async (
    name: string,
    email: string
): Promise<UserDocument> => {
    const filter = { email: email };
    const update = { name: name };

    const doc = await UserModel.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
    });

    return doc;
};
