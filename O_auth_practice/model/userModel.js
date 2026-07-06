import mongoose from "mongoose";
import passport from "passport";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    googleId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model("UserModel", userSchema);

export default User;