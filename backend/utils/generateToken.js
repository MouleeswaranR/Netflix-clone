import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateJwtandCookie=(userId,res)=>{
        const token=jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:"7d"});

        res.cookie("netflix-clone-token",token,{
            httpOnly:true,
            sameSite:'strict',
            maxAge:15*24*60*60*1000, //15 days in milliseconds
            secure:ENV_VARS.NODE_ENV!=="development"
        })

        return token;
}