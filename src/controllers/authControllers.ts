import { Request, Response } from "express";
import { signUpModel } from "../models/authModels";
import { signUpInterface } from "../types/auth-interfaces";
import { exists } from "fs";

export const signUp = async (req: Request<{}, {}, signUpInterface>, res: Response): Promise<void> => {
    try {
        const { username, fullName, email, password, confirmPassword, gender } = req.body;

        
        const usernameExists = await signUpModel.findOne({ username });

        const emailExists = await signUpModel.findOne({ email });

        if (usernameExists) {
            res.status(400).json({ error: "Username already taken" });
            return

        }

        if (emailExists) {
            res.status(400).json({ error: "Email already in use" });
            return
        }

        

        if (password !== confirmPassword) {
            res.status(400).json({ error: "Password and confirm password do not match" });
            return
        }

        
        if (!gender) {
            res.status(400).json({ error: "Gender is required" });
            return
        }

        
        const newUser = await signUpModel.create({ username, fullName, email, password, gender });

        
        res.status(201).json({
            message: "User created successfully",
            user: { username, email, gender, fullName, _id: newUser._id },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const signIn = async(req:Request,res:Response):Promise<void>=>{

    try {
        
        const {email,password,username} = req.body;

        const user = await signUpModel.findOne({$or:[{email}, {username}]});

        if(!user){
            res.status(400).json({error:"Invalid credentials"});
            return;
        }

        if(password !== user.password){
            res.status(400).json({error:"Invalid credentials"});
            return;
        }

        res.status(200).json({message:"Sign in successful",user:{username:user.username,email:user.email,gender:user.gender,fullName:user.fullName,_id:user._id}});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }

}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params._id;
        const { fullName, username, email, gender } = req.body;

        if (!id) {
            res.status(400).json({ error: "User id is required" });
            return;
        }

        const user = await signUpModel.findById(id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        // Check if the username is different from the current one
        if (username && username !== user.username) {
            const usernameExists = await signUpModel.findOne({ username });
            if (usernameExists) {
                res.status(400).json({ error: "Username already taken" });
                return;
            }
        }

        // Check if the email is different from the current one
        if (email && email !== user.email) {
            const emailExists = await signUpModel.findOne({ email });
            if (emailExists) {
                res.status(400).json({ error: "Email already in use" });
                return;
            }
        }

        const updatedUser = await signUpModel.findByIdAndUpdate(
            id,
            { fullName, username, email, gender },
            { new: true }
        );

        res.status(200).json({
            message: "User updated successfully",
            user: {
                username: updatedUser?.username,
                email: updatedUser?.email,
                gender: updatedUser?.gender,
                fullName: updatedUser?.fullName,
                _id: updatedUser?._id,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const deleteUser = async(req:Request,res:Response):Promise<void>=>{

    try {
        
        const id = req.params._id;

        if(!id){
            res.status(400).json({error:"User id is required"});
            return;
        }

        const deletedUser = await signUpModel.findByIdAndDelete(id);

        res.status(200).json({message:"User deleted successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }

}
