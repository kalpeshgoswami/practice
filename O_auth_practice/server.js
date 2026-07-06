import dotenv from "dotenv";

dotenv.config()

import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";

const app = express();

app.use("/", (req, res) => {
    res.json({ message: "hello from server" })
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