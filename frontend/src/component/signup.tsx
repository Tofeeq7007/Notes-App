import { Button } from "./ui/button"
import { Input_field } from "./ui/Input"

// import window_img from "../assets/images/window.jpg";
export const Signup = () => {
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
                        <h2 className="font-inter max-md:text-center font-bold text-[40px] leading-[110%] tracking-[-4%]">Sign up</h2>
                        <p className="text-[#969696] max-md:text-center leading-[150%] text-lg font-inter  ">Sign up to enjoy the feature of HD</p>
                    </div>                    
                </div>
            <div className="flex flex-col sm:gap-5  justify-center items-center h-screen bg-white">

                <div className="flex flex-col sm:gap-5 md:gap-8  md:mt-[100px]">

                    <div className="max-md:hidden  flex flex-col sm:items-center md:items-start gap-3">
                        <h2 className="font-inter max-md:text-center font-bold text-[40px] leading-[110%] tracking-[-4%]">Sign up</h2>
                        <p className="text-[#969696] max-md:text-center leading-[150%] text-lg font-inter  ">Sign up to enjoy the feature of HD</p>
                    </div>


                    <div className="flex flex-col mx-1 items-center gap-5">
                        <Input_field type='Your Name' placeholder='Username' size='md' label='Your Name'/>
                        <Input_field type='date' placeholder='m' size='md' label='Date Of Birth'/>
                        <Input_field type='email' placeholder='Email Address' size='md' label='Email'/>
                        <Button text="Get Otp" size="md"/>
                    </div>
                    <div className="font-inter font-normal text-lg leading-[150%] text-center text-[#6C6C6C]">Already have an account? <span className="text-[#367AFF] cursor-pointer underline">Sign in</span></div>
                </div>
            </div>
        </div>
    )
}