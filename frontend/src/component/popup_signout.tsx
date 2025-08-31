import { useRef } from "react";
import { Input_field } from "./ui/Input";
import { Button } from "./ui/button";
import {  useMutation } from "@tanstack/react-query";
import { AddContent } from "../api/content.api";
import { toast } from "react-toastify";

export interface eachNotes{
    id:string,
    title:string,
}
interface POPUP{
    open:boolean,
    onclose:(type:boolean)=>void,
    notes:eachNotes[],
    setNotes:(type:eachNotes[])=>void;
}

export const Pop_signout = ({notes,setNotes,open,onclose}:POPUP)=>{
    const ref = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    // const [error , setError] = useState("");
    // console.log(notes);
    // console.log(setNotes({...notes,id:"2",title:"new"}));
    const addContentMutation = useMutation({
        mutationFn: (title:string)=>AddContent(title),
        onSuccess: (data) => {
            console.log(data);
            setNotes([...notes,{id:data.currentContentId,title:data.title}]);
            toast.success(data.message);
        onclose(false);
        },
        onError: (e) => {
            // console.log("Add mai eeror")
            console.log(e);
        },        
    });

    function solve(e:React.MouseEvent<HTMLDivElement>) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            onclose(false);
        }
    }  

    function addContent(){
        const title = titleRef.current?.value;
        if(!title || title.trim()==""){
            toast.error("Please enter a valid title");
            return;
        }
        addContentMutation.mutate(title);
    }
        // if(error) setTimeout(()=>{setError("")},3000);
    return <>
    { open && 
        <div>
            <div onClick={(e)=>solve(e)} className={`w-screen h-screen bg-slate-600 opacity-60  fixed top-0 left-0  flex justify-center`}></div>

            <div onClick={(e)=>solve(e)} className={`w-screen h-screen fixed top-0 left-0  flex items-center justify-center`}>
                <div ref={ref} className=" p-4  gap-4  rounded-md bg-white flex flex-col justify-between items-center">
                      {/* {error && <div className="bg-red-50 border border-red-500 text-red-900 px-22 py-2  rounded relative" role="alert">{error}</div>} */}
                    <Input_field ref={titleRef} placeholder={"Your Title"} type={"text"} size="sm"/>
                    <Button onClick={()=>addContent()} text={"create note"} size="sm"/>
                </div>
            </div>

        </div>
    }
    </>
}