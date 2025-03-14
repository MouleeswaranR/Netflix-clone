import express from "express";
import { logIn, logOut, signUp } from "../controllers/authController.js";

const router=express.Router();

router.post("/signup",signUp);

router.post("/login",logIn);

router.post("/logout",logOut);

export default router;