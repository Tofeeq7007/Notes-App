import {  useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input_field } from "./ui/Input"
import { SendOtp, VerifyOTP } from "../service/helper"
import { useNavigate } from "react-router-dom"
import { isAxiosError } from "axios"
// import window_img from "../assets/images/window.jpg";
export const Signin = () => {
    const email = useRef<HTMLInputElement>(null);
    const otp = useRef<HTMLInputElement>(null);
    const [otp_field, set_otp_field] = useState(false);
    const [error , setError] = useState("");
    const navigate = useNavigate();

    async function ActivateOtp(){
        const Email = email.current?.value;
        if( !Email || Email.trim()==""){
            setError("Enter valid email");
            return;
        }
        try{
            if(!otp_field) set_otp_field(true);
            // email verfiy
            const otpStatus = await SendOtp(Email as string);
            console.log( "OTP Status :",otpStatus.message);
            alert(`OTP Sent on your Email`);
        
        }catch(e){
            set_otp_field(false);
            console.log("Activation Otp Errop :");
            if (isAxiosError(e)) {
                if (e.response && e.response.data && e.response.data.message) {
                    setError(e.response.data.message);
                } else {
                    setError("An unexpected API error occurred.");
                }
            } else {
                setError("An unexpected error occurred. Please try again.");
                console.error("An unexpected error:", e);
            }            
        }

    }


    async function SubmitOTP(){
        const Email = email.current?.value;
        const Otp = otp.current?.value;
        if(Otp==""||!Otp){setError("Enter Valid OTP");return;}

        try{

            const data = await VerifyOTP(Email as string,Otp as string);

            console.log("Otp Sahi daala " , data)    
            localStorage.setItem('token',data.message.token);
            
            navigate("/Dashboard");
        }
        catch(e){
            console.log("submit otp error");
            // console.error(err);
            if (isAxiosError(e)) {
                if (e.response && e.response.data && e.response.data.message) {
                    setError(e.response.data.message);
                } else {
                    setError("An unexpected API error occurred.");
                }
            } else {
                setError("An unexpected error occurred. Please try again.");
                console.error("An unexpected error:", e);
            }                  
        }
    }

    if(error) setTimeout(()=>{setError("")},3000);


    return (
        <div className="flex flex-col  items-center h-screen bg-white">
                <div className="flex flex-col gap-22">
                    <div className="md:pl-2 flex mt-5 gap-[10px] justify-center md:justify-start w-[343px] md:w-[527px]">
                        <div>                    
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 text-[#367AFF]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        </div>
                        <div className="font-inter font-semibold text-2xl leading-[110%] tracking-[-4%]">HD</div>
                        
                    </div>
                    <div className=" md:hidden  flex flex-col sm:items-center md:items-start gap-3">
                        <h2 className="font-inter max-md:text-center font-bold text-[40px] leading-[110%] tracking-[-4%]">Sign in</h2>
                        <p className="text-[#969696] max-md:text-center leading-[150%] text-lg font-inter  ">Please login to continue to your account.</p>
                    </div>                    
                </div>
            <div className="flex flex-col sm:gap-5  justify-center items-center h-screen bg-white">

                <div className="flex flex-col sm:gap-5 md:gap-8  md:mt-[100px]">

                    <div className="max-md:hidden  flex flex-col sm:items-center md:items-start gap-3">
                        <h2 className="font-inter max-md:text-center font-bold text-[40px] leading-[110%] tracking-[-4%]">Sign in</h2>
                        <p className="text-[#969696] max-md:text-center leading-[150%] text-lg font-inter  ">Please login to continue to your account.</p>
                    </div>


                    <div className="flex flex-col mx-1 items-center gap-5">
                        {error && <div className="bg-red-50 border border-red-500 text-red-900 px-38 py-2  rounded relative" role="alert">{error}</div>}
                        <Input_field ref={email} type='email' placeholder='Email Address' size='md' label='Email'/>
                        {/*  */}
                        <div className={otp_field ? 'block':'hidden'}>
                            <Input_field ref={otp} type='password' placeholder='OTP' size='md'/>
                            <button onClick={async ()=> SendOtp(email.current?.value as string)} className="font-inter underline font-medium cursor-pointer mt-3 text-base leading-[150%] text-[#367AFF]">Resend OTP</button>
                            <div className="flex gap-5 justify-start items-center mt-3">
                                <input className="w-[15px] h-[15px]"  type="checkbox" id="rememberMe" name="rememberMe" value="Remember Me"/>
                                <p className="font-inter font-semibold text-sm leading-[150%] text-black">Keep me logged in</p>                                    
                            </div>    
                        </div>
                        {/*  */}
                        <Button hidden={otp_field} onClick={()=>ActivateOtp()} text="Sign in" size="md"/>
                        <Button hidden={!otp_field} onClick={()=>SubmitOTP()} text="Sign in" size="md"/>
                    </div>
                    <div className="font-inter font-normal text-lg leading-[150%] text-center text-[#6C6C6C]">Need an account? <span onClick={() => navigate('/signup')} className="text-[#367AFF] cursor-pointer underline">Create one</span></div>
                </div>
            </div>
        </div>
    )
}