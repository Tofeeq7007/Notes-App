// import { Input_field } from "../component/ui/Input"
import window_img from '../assets/images/window.jpg'
import { Signin } from "../component/sigin"

export const Auth_signin = () => {
    return (
        <div className="flex  gap-2.5">
            <Signin/>
            <div className="max-md:hidden m-1">
                <img className="w-[99%] h-[99%]  rounded-md" src={window_img}></img>
            </div>
        </div>
    )
}