import mongoose from "mongoose";

export const connect = (): Promise<typeof mongoose> => {
    return mongoose.connect(process.env.DB_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
};
