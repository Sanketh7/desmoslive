import express from "express";
import { createUser } from "../controllers/user.controller";
import { verifyGoogleAuthToken } from "../tokenAuth";

const router = express.Router();

router.post("/google", verifyGoogleAuthToken, async (req, res) => {
    const user = req.appData.user;
    console.log(`Name: ${user.name}\nEmail: ${user.email}`);

    await createUser(user.name, user.email);
    res.json(user);
    res.status(200);
});

router.delete("/logout", verifyGoogleAuthToken, async (req, res) => {
    console.log(req.appData.user);
    res.redirect("/");
});

export { router as authRouter };
