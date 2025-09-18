import express from 'express';
import { fetchAllTops,fetchAllBottoms, fetchAllDresses, fetchAllSkirts, fetchAllAccessories, fetchAllClothing } from '../controllers/filterControllers.js';

const router=express.Router();
router.get("/tops",fetchAllTops);
router.get("/bottoms",fetchAllBottoms);
router.get("/dresses",fetchAllDresses);
router.get("/skirts",fetchAllSkirts);
router.get("/accessories",fetchAllAccessories);
router.get("/clothing",fetchAllClothing);

export default router;