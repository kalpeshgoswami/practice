import mongoose from "mongoose";
import passport from "passport";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

const User = mongoose.model("userModel", userSchema)

export default User;