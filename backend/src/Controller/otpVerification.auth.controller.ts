import { Request, Response } from "express";
import { JWT_SECRET } from "../config";
import { User } from "../db";
import jwt from 'jsonwebtoken';
export const verify_otp = async (req:Request,res:Response)=>{
    const {email,otp} = req.body;
    if(!email || !otp){
        return res.status(401).json({message:"Invalid OTP"})
    }
    const check = await User.findOne({email});
    if(!check){
        return res.status(401).json({
            message:"Invalid Email"
        })
    }
    const token = jwt.sign({
        id:check._id,
    },JWT_SECRET,{expiresIn:"15m"});
    
    if(check.OtpHash !== otp){
        return res.status(401).json({
            message:"Invalid OTP"
        })
    };    

    res.json({
        message:"OTP Verified",
        name:check.name,
        email:check.email,
        token:token
    }
    )
}