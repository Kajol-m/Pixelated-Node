import express from 'express';
import { fetchAllTops,fetchAllBottoms, fetchAllDresses, fetchAllSkirts, fetchAllAccessories, fetchAllClothing, fetchProductsByCategory } from '../controllers/filterControllers.js';

const router=express.Router();
router.get("/tops",fetchAllTops);
router.get("/bottoms",fetchAllBottoms);
router.get("/dresses",fetchAllDresses);
router.get("/skirts",fetchAllSkirts);
router.get("/accessories",fetchAllAccessories);
router.get("/clothing",fetchAllClothing);
router.get("/category/:id",fetchProductsByCategory);

export default router;