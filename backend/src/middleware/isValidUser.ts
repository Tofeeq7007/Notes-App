import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from "../db";



export const check_userOK = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers["authorization"];
    console.log("AAPKI Request AAYi hai")
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    console.log("Enter in middleware");
    const decoded = jwt.verify(token,JWT_SECRET);
    console.log("Decoded : ", (decoded as JwtPayload).id);
    const checking_valid_token = User.findById((decoded as JwtPayload).id);
    if(!checking_valid_token) {
        return res.status(403).json({
            message:"decoded is not valid"
        })
    }
    req.user_id = (decoded as JwtPayload).id;
    next();
}