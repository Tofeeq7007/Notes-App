import { Request, Response } from "express";
import { Content } from "../db";


export const addNote = async(req:Request , res:Response)=>{
    const {title} = req.body;

    if(!title){
        return res.status(401).json({
            message:"Please provide title"
        })
    }
    const user_id = req.body.user_id;
    // console.log("title" , title)
    // console.log(req.body.user_id);
    const currentContent = await Content.create({
        title:title,
        userId:user_id
    })
    // console.log("Current Content id =",currentContent._id);
    res.json({
        message:"note added successfully"
    })

    
}



export const deleteContent = async (req:Request , res:Response)=>{
    const {contentId} = req.body;

    await Content.findByIdAndDelete(contentId);
    res.json({message:"content deleted successfully"})
    
}


