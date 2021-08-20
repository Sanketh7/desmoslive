import cors from "cors";
import express from "express";
import helmet from "helmet";
import { authRouter } from "./routers/auth.router";
import { branchRouter } from "./routers/branch.router";
import { graphRouter } from "./routers/graph.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(cors({ origin: "*" }));
app.use(helmet()); // sets HTTP headers to protect from malicious requests
app.use(express.json()); // parses JSON payloads

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/graph", graphRouter);
app.use("/api/branch", branchRouter);

export default app;