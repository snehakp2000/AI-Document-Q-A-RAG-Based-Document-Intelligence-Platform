import bcrypt from'bcrypt';
import User from "../models/User.js";
import generateToken  from '../utils/generateToken.js';


export const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;

    try{

    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:'All fields are required'
        })
    }
    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({
            success:false,
            message:'User Exist'
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await User.create({
        name:name,
        email:email,
        password:hashedPassword

    })
   return res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
    }
});
    }
catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}
export const loginUser = async(req,res) =>{
    try{
  const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Required fields should be filled"
        })
    }
    const existingUser = await User.findOne({email});
     if(!existingUser){
        return res.status(401).json({
         success:false,
         message:"User not exist ,Register First"
        })
    }
    const token = generateToken(existingUser._id);
    const isPasswordMatch = await bcrypt.compare(password,existingUser.password);
    if(!isPasswordMatch){
        return res.status(401).json({
            success:false,
            message:'Invalid password or email'
        })
    }
   

    return res.status(200).json({
    success: true,
    token,
    user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email
    }
});
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }


}



