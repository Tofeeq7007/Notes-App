import { toast } from "react-toastify";
import { CheckOtp, GetOtp } from "../api/auth_api";
import { isAxiosError } from "axios";

    export const SendOtp= async(Email:string)=>{
        Email = Email.trim().toLowerCase();
        try{

            const data = await GetOtp(Email as string);
            toast.success(`OTP Sent on your Email`);
            return data;
        }
        catch(e){
            if (isAxiosError(e)) {
                if (e.response && e.response.data && e.response.data.message) {
                    toast.error(e.response.data.message);
                } else {
                    toast.error("An unexpected API error occurred.");
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }                
        }
            
               
    }

    export const VerifyOTP = async(email:string,otp:string)=>{

        const data = await CheckOtp(email,otp);
        return data;
    }