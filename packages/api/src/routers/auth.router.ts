import express from "express";
import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;

const oauthClient = new OAuth2Client(CLIENT_ID);

const router = express.Router();

router.post("/google", async (req, res) => {
    const { token }: { token: string } = req.body;
    const ticket: LoginTicket = await oauthClient.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const { name, email } = ticket.getPayload() as TokenPayload;

    console.log(`Name: ${name}\nEmail: ${email}`);

    if (!name || !email) {
        res.json({ name: "", email: "" });
    } else {
        req.session.user = { name: name, email: email };
        res.json({ name: name, email: email });
    }
    res.status(200);
});

router.delete("/logout", async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/");
    });
});

export { router as authRouter };
