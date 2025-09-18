import express from 'express';
import { fetchTrendingItems, fetchAllTrendingItems } from '../controllers/trendingController.js';

const router=express.Router();
router.get("/trending-items",fetchTrendingItems);
router.get("/trending",fetchAllTrendingItems);

export default router;