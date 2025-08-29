import { Request, Response } from "express";
import { Validation } from "../helper/newUserValidation";
import { User } from "../db";

export const signup = async (req:Request,res:Response)=>{
    const {name , dob , email} = req.body;

    await Validation(name,dob,email,req,res);

    const user = new User({name,dob,email});

    await user.save();

    res.json({
        message:"User Created Successfully"
    })
}