import { Request, Response } from "express";
import { sendEmail } from "./sendEmail.auth";
import { generateOTP } from "../helper/helper";
import { User } from "../db";

export const request_for_otp = async (req:Request,res:Response)=>{
    const {email} = req.body;
    if(!email){
        return res.status(401).json({message:"Invalid Email"})
    }
    const check = await User.findOne({email});
    if(!check){
        return res.json({
            message:"Invalid Email"
        })
    }
    
    const otp = generateOTP();
    const subject = "Welcome to our Notes Application!";
    const message = `your otp is ${otp}. This valid for 5 mintues `;
    await sendEmail(email,subject,message);   

    check.OtpHash = String(otp);
    check.ExpireAt = Date.now() + 60 * 5 * 1000;
    await check.save();
    res.json({
        message:"OTP SEND Successfully"
    }); 

}
