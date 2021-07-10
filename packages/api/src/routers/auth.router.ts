import express from "express";
import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";
import { createUser } from "../controllers/user.controller";
import { createJWT, invalidateJWT, verifyJWTMiddleware } from "../tokenAuth";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;

const oauthClient = new OAuth2Client(CLIENT_ID);

const router = express.Router();

router.post("/google", async (req, res) => {
    const { authToken }: { authToken: string } = req.body;
    const ticket: LoginTicket = await oauthClient.verifyIdToken({
        idToken: authToken,
        audience: CLIENT_ID,
    });
    const { name, email } = ticket.getPayload() as TokenPayload;

    console.log(`Name: ${name}\nEmail: ${email}`);

    if (!name || !email) {
        res.json({ error: "Failed to authenticate Google account." });
        res.status(403);
    } else {
        await createUser(name, email);
        const jwtToken: string = await createJWT(name, email);
        res.json(jwtToken);
        res.status(200);
    }
});

router.delete("/logout", verifyJWTMiddleware, async (req, res) => {
    console.log(req.appData.user);
    await invalidateJWT(req.appData.jwtToken);
    res.redirect("/");
});

export { router as authRouter };
