import express from "express";
import {fetchImageCrimsonFlame, fetchImageDenimDusk, fetchImageDesertGlow, fetchImagePrettyInPink, fetchProductsByCollection} from "../controllers/collectionController.js";

const router=express.Router();
router.get("/collections/:id",fetchProductsByCollection);
router.get("/collectionimage/PrettyInPink",fetchImagePrettyInPink);
router.get("/collectionimage/DenimDusk",fetchImageDenimDusk);
router.get("/collectionimage/DesertGlow",fetchImageDesertGlow);
router.get("/collectionimage/CrimsonFlame",fetchImageCrimsonFlame);

export default router;