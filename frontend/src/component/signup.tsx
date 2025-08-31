import { useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input_field } from "./ui/Input"
import { isAxiosError } from "axios";
import { SendOtp, VerifyOTP } from "../service/helper";
import { useNavigate } from "react-router-dom";
import {  signup } from "../api/auth_api";
import {toast} from "react-toastify"
// import window_img from "../assets/images/window.jpg";
export const Signup = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const dobRef = useRef<HTMLInputElement>(null);
    // const [error,setError] = useState("");
    const [otp_field, set_otp_field] = useState(false);
    const otp = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function ActivateOtp(){
        const Email = emailRef.current?.value.toLowerCase();
        const dob = dobRef.current?.value;
        const name = nameRef.current?.value;
        if( !Email || Email.trim()=="" || !name || name.trim()=="" || !dob || dob.trim() == "" ){
            toast.error("Please Fill all Fields");
            return;
        }
        
        try{
            const signin_response = await signup(name,Email,dob);
            console.log("Signup Response :",signin_response.message);
        }
        catch(e){
            if (isAxiosError(e)) {
                if (e.response && e.response.data && e.response.data.Error_Detail) {
                    
                    toast.error(e.response.data.Error_Detail.name || e.response.data.Error_Detail.dob || e.response.data.Error_Detail.email);                    
                }
                else {
                    toast.error(e.response?.data.message || "An unexpected API error occurred.");
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.");
                // console.error("An unexpected error:", e);
            }      
            return;      
        }

        try{


            if(!otp_field) set_otp_field(true);
            // email verfiy
            const otpStatus = await SendOtp(Email as string);
            console.log( "OTP Status :",otpStatus.message);
        
        }catch(e){
            set_otp_field(false);
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
    async function SubmitOTP(){
        const Email = emailRef.current?.value.toLowerCase();
        const Otp = otp.current?.value;
        if(Otp==""||!Otp){toast.error("Enter Valid OTP");return;}

        try{

            const data = await VerifyOTP(Email as string,Otp as string);

            console.log("Otp Sahi daala " , data)    
            localStorage.setItem('token',data.token);
            localStorage.setItem('name',data.name);
            localStorage.setItem('email',data.email);    
            
            toast.success(`Signup Successful`);
            navigate("/Dashboard");
        }
        catch(e){
            // console.log("submit otp error");
            // console.error(err);
            if (isAxiosError(e)) {
                if (e.response && e.response.data && e.response.data.message) {
                    toast.error(e.response.data.message);
                } else {
                    toast.error("An unexpected API error occurred.");
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.");
                // console.error("An unexpected error:", e);
            }                  
        }
    }


    return (
        <div className="flex max-md:ml-3 flex-col  items-center h-screen bg-white">
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
                        <h2 className="font-inter max-md:text-center font-bold text-[40px] leading-[110%] tracking-[-4%]">Sign up</h2>
                        <p className="text-[#969696] max-md:text-center leading-[150%] text-lg font-inter  ">Sign up to enjoy the feature of HD</p>
                    </div>                    
                </div>
            <div className="flex flex-col sm:gap-5  justify-center items-center h-screen bg-white">

                <div className="flex flex-col sm:gap-5 md:gap-5  md:mt-[100px]">

                    <div className="max-md:hidden  flex flex-col sm:items-center md:items-start gap-3">
                        <h2 className="font-inter max-md:text-center font-bold text-[40px] leading-[110%] tracking-[-4%]">Sign up</h2>
                        <p className="text-[#969696] max-md:text-center leading-[150%] text-lg font-inter  ">Sign up to enjoy the feature of HD</p>
                    </div>


                    <div>
                        {/* {error && <div className=" bg-red-50 border ml-3 mx-1 border-red-500 text-red-900 px-32 py-2  rounded relative" role="alert">{error}</div>} */}
                        <div className="flex flex-col mx-1 items-center gap-4">
                            <Input_field ref={nameRef} type='Your Name' placeholder='Username' size='md' label='Your Name'/>
                            <Input_field ref={dobRef} type='date' placeholder='m' size='md' label='Date Of Birth'/>
                            <Input_field ref={emailRef} type='email' placeholder='Email Address' size='md' label='Email'/>

                            <div className={otp_field ? 'block':'hidden mt-3'}>
                                <Input_field ref={otp} type='password' placeholder='OTP' size='md'/>
                            </div>                            
                            <Button onClick={() =>ActivateOtp()} hidden={otp_field} text="Get Otp" size="md"/>
                            <Button hidden={!otp_field} onClick={()=>SubmitOTP()} text="Sign up" size="md"/>
                            <div className="font-inter font-normal text-lg leading-[150%] text-center text-[#6C6C6C]">Already have an account? <span onClick={()=>navigate('/')} className="text-[#367AFF] cursor-pointer underline">Sign in</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}