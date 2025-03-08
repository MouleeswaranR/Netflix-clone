import User from "../model/userModel.js";
import { fetchDataFromApi } from "../services/tmdbService.js";

export const searchPerson=async(req,res)=>{
    const {query}=req.params;
    try{
        const response=await fetchDataFromApi(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length==0) return res.status(404).send(null);
        // console.log(req.user);
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    createdAt:new Date(),
                    searchType:"person"
                }
            }
        });
        res.status(200).json({success:true,content:response.results});
    }catch(err){
        console.log("Error in fetching person search "+err.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
        
    }
}

export const searchMovie=async(req,res)=>{
    const {query}=req.params;
    try{
        const response=await fetchDataFromApi(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length==0) return res.status(404).send(null);
        
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    createdAt:new Date(),
                    searchType:"movie"
                }
            }
        })
        res.status(200).json({success:true,content:response.results});
    }catch(err){
        console.log("Error in fetching movie search"+err.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
        
    }
}

export const searchTv=async(req,res)=>{
    const {query}=req.params;
    try{
        const response=await fetchDataFromApi(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length==0) return res.status(404).send(null);
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    createdAt:new Date(),
                    searchType:"tv"
                }
            }
        })
        res.status(200).json({success:true,content:response.results});
    }catch(err){
        console.log("Error in fetching tv serach"+err.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
        
    }
}

export const getSearchHistory=async(req,res)=>{
    try{
        res.status(200).json({success:true,content:req.user.searchHistory});
    }catch(err){
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const removeItemFromSearchHistory=async(req,res)=>{
    let {id}=req.params;
    id=parseInt(id);
    try{
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory:{
                    id:id
                }
            }
        })
        res.status(200).json({success:true,message:"History deleted successfully"});
    }catch(err){
        console.log("Error in history deleeting middleware"+err.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}