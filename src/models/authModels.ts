import mongoose from "mongoose";
import { signUpInterface } from "../types/auth-interfaces";

export const signUpSchema = new mongoose.Schema<signUpInterface>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullName:{
        type:String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    gender: {
        type: String,
        required: true,
    },
}, {timestamps: true})

export const signUpModel = mongoose.model<signUpInterface>("signUp", signUpSchema);
