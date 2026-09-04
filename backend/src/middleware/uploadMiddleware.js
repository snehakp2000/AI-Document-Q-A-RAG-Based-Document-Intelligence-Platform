import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
    cb(null, 'uploads/');  
    },
    filename: (req,file,cb) =>{
        const uniqueName= Date.now() + '-' + file.originalname;
        cb(null, uniqueName); 
    }
})

const filefilter = (req,file,cb) =>{
    const allowedTypes = [ '.pdf' , '.docs', '.txt'];

    const extension = path.extname(file.originalname).toLowerCase();

    const allowedMimeTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain"
];
    if (
    allowedMimeTypes.includes(file.mimetype) &&
    allowedTypes.includes(extension)
) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, DOCX and TXT files are allowed."));
    }
}

const upload = multer({
    storage,
    filefilter,
    limits:{
        fileSize: 5 * 1024 * 1024 // 5MBs
    }
})


export default upload;
