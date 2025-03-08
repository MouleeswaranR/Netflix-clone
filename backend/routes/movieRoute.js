import express from "express";
import { getMovieDetails, getMoviesByCategory, getMovieTrailer, getSimilarmovies, getTrendingMovie } from "../controllers/movieController.js";

const router=express.Router();

router.get("/trending",getTrendingMovie);
router.get("/:id/trailers",getMovieTrailer);
router.get("/:id/details",getMovieDetails);
router.get("/:id/similar",getSimilarmovies);
router.get("/:category",getMoviesByCategory);

export default router;