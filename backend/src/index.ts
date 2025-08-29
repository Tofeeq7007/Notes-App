import express, { Request, Response } from 'express';
import { User } from './db';
import { generateOTP } from './helper/helper';
import { sendEmail } from './Controller/sendEmail.auth';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';
import { Validation } from './helper/newUserValidation';
const app = express();

app.use(express.json());

app.post('/signup', async (req:Request,res:Response)=>{
    const {name , dob , email} = req.body;

    await Validation(name,dob,email,req,res);

    const user = new User({name,dob,email});

    await user.save();
    console.log("Hi 5")

    res.json({
        message:"User Created Successfully"
    })
})

app.post("/request_otp", async(req:Request,res:Response)=>{
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
})


app.post("/verify_otp",async(req,res)=>{
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
    const token = jwt.sign({
        id:check._id,
    },JWT_SECRET,{expiresIn:"15m"});
    
    console.log("h1 3")
    if(check.OtpHash !== otp){
        return res.json({
            message:"Invalid OTP"
        })
    };    

    console.log("h1 4")
    res.json({
        message:"OTP Verified",
        token:token
    }
    )
});





app.listen(3000,()=>{
    console.log('server is running');
})