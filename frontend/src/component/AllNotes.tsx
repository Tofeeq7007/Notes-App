import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Notes } from "./Notes"
import { GetContent } from "../api/content.api";

export interface Content {
    _id:string;
    title:string;
}

export const AllNotes = () =>{
    const token = localStorage.getItem("token");

    const {data}  = useQuery({
        queryKey:["content"],
        queryFn: async()=> await GetContent(),
        placeholderData:keepPreviousData,
        staleTime:15000,
        enabled:!!token 
    })    
    console.log("data = ",data);
    // console.log("Array = ",data.data);
    // console.log("kk = ",data.data.data);
    // data = data.data;
    // console.log("data = ",data);
    
    return (<>
        <Notes key={"123"} text={"Notes 1"} id={"122"}/>
        <Notes key={"126"} text={"Notes 2"} id={"122"}/> 
        {data?.content?.map((item:Content)=>(
            <Notes key={item._id} text={item.title} id={item._id}/>
        ))}
    </>
    )
}
