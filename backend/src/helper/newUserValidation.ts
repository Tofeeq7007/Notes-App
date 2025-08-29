import { Request, Response } from "express";
import z from 'zod';
import { User } from "../db";

export const Validation = async (name:string,email:string,dob:string ,req:Request,res:Response)=>{
    console.log("Hi 1")
    if(!dob) {
        return res.status(401).json({message:'please enter your date of birth'});
    }
    console.log("Hi 2")
    const CheckUser = z.object({
        name:z.string().min(2,"Username must be at least 2 char").max(10 ,"username not longer than 10 char"),
        email:z.string().email("Invalid Email Address"),
    })
    console.log("Hi 3")

    const userInfo = CheckUser.safeParse(req.body);
    if(!userInfo.success){
        const Error_Detail :Record<string, string> = {};
        userInfo.error.issues.forEach((err)=>{
            
            const field = err.path[0] as string;
            if(!Error_Detail[field]){

                Error_Detail[field] = (err.message);
            }

        })
        return res.status(411).json( {
            Error_Detail
        })

        // Sample if email is invalid agar dono invalid tho dono aayege
        // {
        //     "Error_Detail": {
        //         "email": "Invalid Email Address"
        //     }
        // }        
    }

    // check user Already Exist or Not
    const check = await User.findOne({email});

    if(check){
        return res.status(409).json({message:"user already exist"})
    }
}