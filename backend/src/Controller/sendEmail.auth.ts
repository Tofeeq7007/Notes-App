import nodemailer from 'nodemailer';
import { My_Email, My_Password } from '../config';

export const sendEmail = async(email:string,subject:string,message:string)=>{
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth:{
            user:My_Email,
            pass:My_Password
        }
    });


        try {
            const info = await transporter.sendMail({
            from: My_Email, 
            to: email, 
            subject: subject, 
            text:message
            });

            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // return true;
        } catch (err) {
            console.error("Error while sending mail", err);
        }
        

    
}