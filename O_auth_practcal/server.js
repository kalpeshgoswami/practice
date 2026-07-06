import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import router from "./router/authRouter.js";
import session from "express-session";
import passport from "./config/passport.js";
import profileRouter from "./router/profileRouter.js"

dotenv.config({ path: "./.env" })

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 90 * 1000
    }
}))

app.use(passport.initialize());
app.use(passport.session())

app.set("view engine", "ejs")
app.use(express.json());
app.use("/auth", router);
app.use("/profile", profileRouter);


app.use("/", (req, res) => {
    res.render("home", { user: req.user })
})

app.use((req, res, next) => {
    return next(new HttpError("requested route not found", 404))
})

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(new HttpError(error.message))
    }

    res.status(error.statusCode || 500).json({ message: error.message || "internal server error" })
})

const port = 5000;
async function startServer() {

    try {
        const connect = await connectDB();

        if (!connect) {
            throw new Error("Failed to connect DB");
        }

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

startServer();