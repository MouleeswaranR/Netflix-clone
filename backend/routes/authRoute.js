import express from "express";

const router=express.Router();

router.get("/signup",()=>{
        router.send("SignUp Route");
});

router.get("/login",()=>{
        router.send("Login Route");
});

router.get("/logout",()=>{
        router.send("Logout Route");
});

export default router;