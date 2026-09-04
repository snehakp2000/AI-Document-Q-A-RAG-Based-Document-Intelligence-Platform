import mongoose from "mongoose";

const documentSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required field'],
        trim:true,
    },
    fileName:{
        type:String,
        required:[true,'filename is required'],
        trim:true
    },
    filetype:{
        type:String,
        required:[true,'filetype is required']
    },
    filesize:{
        type:Number,
        required:[true,'filesize is required']
    },
    filePath:{
        type:String,
        required:[true,'filepath is required']
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
         enum: [
        "uploaded",
        "processing",
        "processed",
        "failed"
    ],
    default: "uploaded"
    }
},{timestamps:true},)

const Document = mongoose.model('Document',documentSchema);

export default Document;