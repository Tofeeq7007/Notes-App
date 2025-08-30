import { CheckOtp, GetOtp } from "../api/auth_api";

    export const SendOtp= async(Email:string)=>{
        
        const data = await GetOtp(Email as string)
          
        console.log(data);
        return data;
            
               
    }

    export const VerifyOTP = async(email:string,otp:string)=>{

        const data = await CheckOtp(email,otp);
        return data;
    }