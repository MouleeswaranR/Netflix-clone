import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import User from "../model/userModel.js";

export const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies["netflix-clone-token"];
    if(!token){
        return res.status(401).json({success:false,message:"Unauthhorized token "});
    }
    const decoded=jwt.verify(token,ENV_VARS.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({success:false,message:"Not a valid token "});
    }
    const user=await User.findById(decoded.userId).select("-password");
    if(!user){
        return res.status(404).json({success:false,message:"User not found "});
    }
   
    req.user=user;
    // console.log(req.user);
    next();
    }catch(err){
            console.log("Error in protecting middleware"+err.message);
            res.status(500).json({success:false,message:"Internal server error"})
            
    }

}