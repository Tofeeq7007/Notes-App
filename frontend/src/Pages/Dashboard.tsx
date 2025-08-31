import {  useEffect, useState } from "react"
import { Button } from "../component/ui/button"
import { UserInfo } from "../component/UserInfo"
import { Pop_signout } from "../component/popup_signout"
import { useNavigate } from "react-router-dom"
import { AllNotes } from "../component/AllNotes"
import { toast } from "react-toastify"

export const Dashboard = () => {
    const [open,onclose] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/");
        }   
    },[])

    function logout(){
        localStorage.removeItem("token");
        toast.success("Logout Successfully");        
        navigate("/")
    }

    return (
        <div className=" flex flex-col items-center justify-center">
            <div className="flex justify-between mt-4 gap-2 items-center w-95">
                <div className="flex justify-between gap-4 items-center">
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 text-[#367AFF]">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>                    
                    </div>
                    <div className="font-inter font-medium text-xl leading-[110%] tracking-[-4%]">Dashboard</div>
                </div>
                <button onClick={() => logout()} className="underline cursor-pointer text-sm leading-[150%] font-inter text-[#367AFF] font-semibold">Sign out</button>
            </div>
            {/*  */}
            <UserInfo/>
            <Pop_signout onclose={onclose} open={open} />
            <Button onClick={()=>onclose(true)} text={"Create Note"} size="md"/>
            <div className="w-95">
                <div className="flex  font-inter mt-9 font-medium text-xl leading-[110%] tracking-[-4%]">Notes</div>
                {/* <Notes text={"Notes 1"} id={"122"}/>
                <Notes text={"Notes 2"} id={"122"}/> */}
                <AllNotes/>
            </div>

            {/*  */}
        </div>
    )
}