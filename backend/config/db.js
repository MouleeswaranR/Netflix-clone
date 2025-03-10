import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDb=async()=>{
  try{
    const conn=await mongoose.connect(ENV_VARS.MONGODB_URI);
    console.log("Database connected to" + conn.connection.host);
  }catch(err){
    process.exit(1);
    console.error("Error Connecting to Database"+err.message);
    
  }
}