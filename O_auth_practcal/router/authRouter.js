import express from "express"
import passport from "../config/passport.js";
import httpError from "../middleware/httpError.js";

const router = express.Router();

router.get("/loggin", (req, res, next) => {
    res.render("loggin")
})

router.get(
    "/google/loggin",
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
        res.redirect("/");
    });
});

export default router;