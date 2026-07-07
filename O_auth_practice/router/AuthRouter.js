
import express from "express";
import passport from "passport";

import HttpError from "../middleware/HttpError.js";

const router = express.Router();

router.get("/loggin", (req, res) => {
    res.render("loggin");
});

router.get(
    "/google/redirect",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get(
    "/google/redirect",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/profile");
    }
);

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            throw new Error("error")
        }
        res.redirect("/")
    })
})

export default router;