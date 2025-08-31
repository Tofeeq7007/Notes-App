import { BACKEND_URL } from "../config"
import { axiosInstance } from "../service/api"


export const GetContent = async () => {
    const response = await axiosInstance.get(`${BACKEND_URL}/content/get_note`,{        
        headers: {
            Authorization: localStorage.getItem('token')
        }        
    })
    return response.data;
}
export const AddContent = async (title:string) => {
    console.log("title : ", title);
    // Pass body as 2nd arg and headers in 3rd config arg
    const response = await axiosInstance.post(
        `${BACKEND_URL}/content/add`,
        { data: title },
        {
            headers: {
                Authorization: localStorage.getItem('token') || ''
            }
        }
    )
    return response.data;
}

export const deleteContent = async (id:string) => {
    console.log("your id :" ,id);
    const response = await axiosInstance.delete(`${BACKEND_URL}/content/delete`,{      
        data:{data:id},  
        headers: {
            Authorization: localStorage.getItem('token')
        }        
    })
    return response.data;
}
