import express from "express";
import { logIn, logOut, signUp,authCheck } from "../controllers/authController.js";
import {protectRoute} from '../middleware/protectRoute.js'
const router=express.Router();

router.post("/signup",signUp);

router.post("/login",logIn);

router.post("/logout",logOut);

router.get("/authCheck",protectRoute,authCheck);
export default router;