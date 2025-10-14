import { Router } from "express";
import { addProductToCart,getProductOfCart } from "../controllers/orderController.js";
import { authenticateToken } from "../middlewares/validate.js";

const router=Router();

router.post("/addCart",authenticateToken,addProductToCart);
router.get("/getCart",authenticateToken,getProductOfCart)
export default router;
