import * as dotenv from "dotenv";
import express from "express";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";

import { connect } from "./connect";
import { authRouter } from "./routers/auth.router";
import { User } from "./models/user.model";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "local";

const PORT: number = process.env.PORT
    ? parseInt(process.env.PORT as string)
    : 3000;

const app = express();

declare module "express-session" {
    interface SessionData {
        user: User;
    }
}

const sessionData = {
    secret: process.env.SESSION_SECRET as string,
    cookie: {
        secure: false,
    },
};

if (NODE_ENV == "production") {
    // use HTTPS instead of HTTP
    app.set("trust proxy", 1);
    sessionData.cookie.secure = true;
}

app.use(session(sessionData));
app.use(cors({ origin: "*" }));
app.use(helmet()); // sets HTTP headers to protect from malicious requests
app.use(express.json()); // parses JSON payloads

app.use("/api/auth", authRouter);

connect()
    .then(() =>
        app.listen(PORT, () => {
            console.log(`Desmos Live API listening on port ${PORT}`);
        })
    )
    .catch((err) => {
        console.log(`Failed to connect to database. ERROR: ${err}`);
    });
