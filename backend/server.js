import express from 'express';
import authRoutes from './routes/authRoute.js';
import movieRoutes from './routes/movieRoute.js';
import tvRoutes from './routes/tvRoute.js';
import searchRoutes from './routes/searchRoutes.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDb } from './config/db.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/protectRoute.js';


const app=express();
const PORT=ENV_VARS.PORT;
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movies",protectRoute,movieRoutes);
app.use("/api/v1/tv",protectRoute,tvRoutes);
app.use("/api/v1/search",protectRoute,searchRoutes);
app.listen(PORT,()=>{
    connectDb();
    console.log("Server is listening to 5000");  
})