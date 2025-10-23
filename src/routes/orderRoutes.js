import { Router } from "express";
import { addProductToCart,getProductOfCart,removeProductFromCart } from "../controllers/orderController.js";
import { authenticateToken } from "../middlewares/validate.js";

const router=Router();

router.post("/addCart",authenticateToken,addProductToCart);
router.get("/getCart",authenticateToken,getProductOfCart);
router.delete("/removeCart",authenticateToken,removeProductFromCart);
export default router;
