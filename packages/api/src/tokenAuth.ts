import * as jwt from "jsonwebtoken";
import express from "express";
import { User } from "./models/user.model";
import { createNodeRedisClient } from "handy-redis"; // wrapper for node_redis with async/await support
import * as dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_MS = 1000 * 60 * 60; // expires in 1 hour

// add additional fields to Express.Request to use in middleware
interface RequestAppData {
    user: User;
    jwtToken: string;
}
declare module "express-serve-static-core" {
    interface Request {
        appData: RequestAppData;
    }
}

// create Redis client that stores a whitelist of JWT tokens
const redisClient = createNodeRedisClient();

// creates JWT token and signs it
// JWT token expiry time is set and added to Redis database
export const createJWT = async (
    name: string,
    email: string
): Promise<string> => {
    // TODO: make jwt sign async
    const jwtToken = jwt.sign({ name: name, email: email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_MS,
    });
    await redisClient.set(jwtToken, "active");
    await redisClient.expire(jwtToken, JWT_EXPIRES_MS / 1000);
    return jwtToken;
};

// ExpressJS middleware to verify JWT token in HTTP authorization header
// 401 status if no authorization header
// 403 status if invalid token in authorization header / failed to authenticate
// JWT token contents (type User) added to Request.appData.user
export const verifyJWTMiddleware = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    if (!req.headers.authorization) {
        res.json({ error: "Needs authentication." });
        res.status(401);
        return;
    }
    const redisRes = await redisClient.get(req.headers.authorization);
    if (redisRes !== "active") {
        res.json({
            error: "Failed to authenticate. Expired or invalid token.",
        });
        res.status(403);
        return;
    }
    console.log(req.headers.authorization);
    jwt.verify(
        req.headers.authorization as string,
        JWT_SECRET,
        (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ error: "Failed to authenticate. Invalid token." });
                res.status(403);
                return;
            }
            const user = decoded as User;
            if (!user.name || !user.email) {
                console.log(err);
                res.json({ error: "Failed to authenticate. Invalid token." });
                res.status(403);
                return;
            }
            req.appData.user = user;
            req.appData.jwtToken = req.headers.authorization as string;
        }
    );
    next();
};

// removes JWT token from Redis database
// this invalidates the token from being used again
export const invalidateJWT = async (jwtToken: string): Promise<void> => {
    await redisClient.del(jwtToken);
};
