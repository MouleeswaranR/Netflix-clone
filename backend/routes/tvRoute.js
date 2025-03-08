import express from "express";
import { getSimilarTv, getTrendingTv, getTvByCategory, getTvDetails, getTvTrailer } from "../controllers/tvController.js";

const router=express.Router();

router.get("/trending",getTrendingTv);
router.get("/:id/trailers",getTvTrailer);
router.get("/:id/details",getTvDetails);
router.get("/:id/similar",getSimilarTv);
router.get("/:category",getTvByCategory);

export default router;