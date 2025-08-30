import { BACKEND_URL } from '../config.ts'
import { axiosInstance } from '../service/api'


export async function signup(name:string,email:string,dob:string){
    const response = await axiosInstance.post(`${BACKEND_URL}/auth/signup`,{
        name:name,
        dob:dob,
        email:email,
    })
    return response.data
}

export async function signin(Email:string){
    const response = await axiosInstance.post(`${BACKEND_URL}/auth/signin` , {
        email:Email,
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // }
    })
    return response.data
}

export async function GetOtp(Email:string){
    const response = await axiosInstance.post(`${BACKEND_URL}/auth/request_otp`,{
        email:Email
    })
    return response.data
}
export async function CheckOtp(email:string,otp:string){
    const response = await axiosInstance.post(`${BACKEND_URL}/auth/verify_otp`,{
        email:email,
        otp:otp
    })
    return response.data
}