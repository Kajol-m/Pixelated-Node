import express from 'express';
import { fetchBestsellerItems, fetchAllBestsellerItems } from '../controllers/bestsellerController.js';

const router=express.Router();
router.get("/bestseller-items",fetchBestsellerItems);
router.get("/bestsellers",fetchAllBestsellerItems);

export default router;