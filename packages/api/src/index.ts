import "reflect-metadata";

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { connect } from "./connect";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";
import { graphRouter } from "./routers/graph.router";

dotenv.config();

// const NODE_ENV = process.env.NODE_ENV || "local";

const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT as string)
  : 7000;

const app = express();

app.use(cors({ origin: "*" }));
app.use(helmet()); // sets HTTP headers to protect from malicious requests
app.use(express.json()); // parses JSON payloads

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/graph", graphRouter);

connect()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Desmos Live API listening on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(`Failed to connect to database. ERROR: ${err}`);
  });
