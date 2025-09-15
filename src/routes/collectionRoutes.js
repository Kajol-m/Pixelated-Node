import express from "express";
import {fetchProductsByCollection} from "../controllers/collectionController.js";

const router=express.Router();
router.get("/collections/:id",fetchProductsByCollection);

export default router;