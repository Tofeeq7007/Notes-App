import { Request, Response } from "express";
import { User } from "../db";

export const CheckVerify = async(req:Request,res:Response)=>{
    const {email,otp} = req.body;
    if(!email || !otp){
        return res.status(401).json({message:"Invalid OTP"})
    }
    console.log("h1 1")
    const check = await User.findOne({email});
    if(!check){
        return res.json({
            message:"Invalid Email"
        })
    }
    console.log("h1 2")

    
    console.log("h1 3")
    if(check.OtpHash !== otp){
        return res.json({
            message:"Invalid OTP"
        })
    };   
    
    if(check) return check;
    else{
        return res.json({
            message:"Invalid OTP"
        })
    }

}