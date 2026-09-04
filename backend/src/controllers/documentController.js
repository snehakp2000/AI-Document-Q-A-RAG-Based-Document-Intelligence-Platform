import Document from '../models/Document.js';
import fs  from 'fs/promises';
import { processDocument } from "../ai/processing/documentProcessing.js";


export const uploadDocument =async(req,res) =>{
    try{

        const {title} =req.body;
        const file = req.file;

        if(!file || !title){

            return res.status(400).json({
                success:false,
                message:"Please provide all the required fields."
            })
        }
        const newDocument =await Document.create({
            title:title,
            fileName:file.filename,
            filetype:file.mimetype,
            filesize:file.size,
            filePath:file.path,
            uploadedBy:req.user._id
        })
        await processDocument(newDocument._id);
        return res.status(201).json({
            success:true,
            message:"Document uploaded successfully.",
            document:newDocument
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const getDocuments =async(req,res) =>{
    try{
       const documents = await Document.find({uploadedBy:req.user._id}).sort({ createdAt: -1 });
     
       return res.status(200).json({
            success:true,
            count:documents.length,
            documents:documents
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const getDocumentById =async(req,res) =>{
    try{
        const documentId = req.params.id;
        const document =await Document.findOne({_id:documentId,uploadedBy:req.user._id});
        if(!document){
            return res.status(404).json({
                success:false,
                message:"Document not found."
            })
        }
        return res.status(200).json({
            success:true,
            document:document
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const deleteDocument =async(req,res) =>{
    try{
        const documentId = req.params.id;
        const document =await Document.findOne({_id:documentId,uploadedBy:req.user._id});
        if(!document){
            return res.status(404).json({
                success:false,
                message:"Document not found to delete."
            })
        }
        try {
    await fs.unlink(document.filePath);
} catch (err) {
    console.log("File already deleted.");
}

await document.deleteOne();
       
        return res.status(200).json({
            success:true,
            message:"Document deleted successfully."
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



