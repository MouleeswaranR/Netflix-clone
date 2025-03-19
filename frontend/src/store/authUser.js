import axios from "axios";
import toast from "react-hot-toast";
import {create} from "zustand";

export const useAuthStore=create((set)=>({
    user:null,
    isSigningUp:false,
    isCheckingAuth:true,
    isLoggingOut:false,
    isLogginIn:false,
    signup:async(credentials)=>{
        try {
            set({isSigningUp:true})
           const response =await axios.post("/api/v1/auth/signup",credentials);
            set({user:response.data.user,isSigningUp:false}) 
            toast.success("Account created successfully");
        } catch (error) {
          toast.error(error.response.data.message||"Sign up failed") ;
          set({isSigningUp:false,user:null}); 
        }
    },
    login:async(credentials)=>{
        set({isLogginIn:true});

        try {
            const response=await axios.post("/api/v1/auth/login",credentials);
            set({isLogginIn:false,user:response.data.user});

        } catch (error) {
              toast.error(error.response.data.message||"Log in failed ") ;
          set({isSigningUp:false,user:null}); 
        }
    },
    logout:async()=>{
        try {
            set({isLoggingOut:true})
            await axios.post("/api/v1/auth/logout");
            set({isLoggingOut:false,user:null});
            toast.success("Logged out successfully");
        } catch (error) {
            set({isLoggingOut:false});
            toast.error(error.message.response.data||"An error occured");
        }
    },
    authCheck:async()=>{
        set({isCheckingAuth:true});
        try {
            const response=await axios.get("/api/v1/auth/authCheck");
            set({user:response.data.user,isCheckingAuth:false});
        } catch (error) {
            set({isCheckingAuth:false})
        }
    }
}))


