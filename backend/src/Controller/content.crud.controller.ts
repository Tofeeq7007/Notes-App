import { Request, Response } from "express";
import { Content } from "../db";


export const addNote = async(req:Request , res:Response)=>{
    const {data} = req.body;

    if(!data){
        return res.status(401).json({
            message:"Please provide title"
        })
    }
    const user_id = req.user_id;
    // console.log("title" , title)
    // console.log(req.body.user_id);
    const currentContent = await Content.create({
        title:data,
        userId:user_id
    })
    // console.log("Current Content id =",currentContent._id);
    res.json({
        message:"note added successfully"
    })

    
}



export const getNotes = async (req:Request , res:Response)=>{
    console.log("enter in getNotes : " + req.user_id);
    const content = await Content.find({
        userId:req.user_id
    });
    res.json({content:content})
    
}
export const deleteContent = async (req:Request , res:Response)=>{
    const {data} = req.body;

    await Content.findByIdAndDelete(data);
    res.json({message:"content deleted successfully"})
    
}


