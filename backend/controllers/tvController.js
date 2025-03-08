import { fetchDataFromApi } from "../services/tmdbService.js"

export const getTrendingTv=async(req,res)=>{
    try{
        const data=await fetchDataFromApi("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomMovie=data.results[Math.floor(Math.random()*data.results?.length)];
         res.status(200).json({success:true,content:randomMovie})
    }catch(err){
        res.status(500).json({success:false,message:"Internal Server Error 1"})
    }
   

}

export const getTvTrailer=async(req,res)=>{
    const {id}=req.params;
    
    try{
        const data=await fetchDataFromApi(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.status(200).json({success:true,trailers:data.results});
    }catch(err){
        if(err.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const getTvDetails=async(req,res)=>{
    const {id}=req.params;
    try{
        const data=await fetchDataFromApi(`https://api.themoviedb.org/tv/${id}?language=en-US`);
        res.status(200).json({success:true,content:data});
    }catch(err){
        if(err.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const getSimilarTv=async(req,res)=>{
    const {id}=req.params;
    try{
        const data=await fetchDataFromApi(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success:true,content:data.results});
    }catch(err){
        res.status(500).json({success:false,message:"Internal server error"});
    
    }
}

export const getTvByCategory=async(req,res)=>{
    const {category}=req.params;
    try{
        const data=await fetchDataFromApi(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({success:true,content:data.results});
    }catch(err){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}