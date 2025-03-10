import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { generateJwtandCookie } from "../utils/generateToken.js";


export  const signUp=async(req,res)=>{
    try{
        const {email,password,username}=req.body;
        if(!email||!password||!username){
            res.status(400).json({success:false,message:"All fields are required"});
        }
        const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            res.status(400).json({success:false,message:"Not a Valid Email"});

        }
        if(password.length<6){
            res.status(400).json({success:false,message:"Password length must be more than 6 characters"});
        }
        const existingUserByEmail=await User.findOne({email:email});
        if(existingUserByEmail){
            res.status(400).json({success:false,message:"Email address already exists"});
        }
        const existingUserByUser=await User.findOne({username});
        if(existingUserByUser){
            res.status(400).json({success:false,message:"Username already exists"});
        }
        const PROFILE_PICS=['/avatar1.png','/avatar2.png','/avatar3.png'];
        const image=PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)];
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            username,
            email,
            password:hashedPassword,
            image,
        })
        generateJwtandCookie(newUser._id,res);
        await newUser.save();
        res.status(200).json({
            success:true,
            user:{
                ...newUser._doc,
                password:""
            },
            message:"User created successfully"
        })
    }catch(err){
        console.log("Error creating Account in signup controller"+err.message);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
        
    }
}

export const  logIn=async (req,res)=>{
   try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({success:false,message:"Required all fields"})
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:"Credentials not found"})
        }

        const isPassword=await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res.status(400).json({success:false,message:"Password not matched"})
        }
        generateJwtandCookie(user._id,res);
        res.status(200).json({success:true,message:"Logged in successfully"});
   }catch(err){
    console.log("Error creating Account in login controller"+err.message);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
   }
}

export const  logOut=async (req,res)=>{
    try{
        res.clearCookie("netflix-clone-token");
        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    }catch(err){
        console.log("Error creating Account in logout controller"+err.message);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}