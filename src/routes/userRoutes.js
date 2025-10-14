import { Router } from "express";
import { register,login, fetchUserDetails, fetchUserAddress, setWishlist, removeWishlist, getWishlist, getWishlistDetails} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/validate.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile",authenticateToken,fetchUserDetails);
router.get("/address",authenticateToken,fetchUserAddress);
router.post("/toggleWishlist",authenticateToken,setWishlist);
router.delete("/toggleWishlist",authenticateToken,removeWishlist);
router.get("/wishlist/:user_id",authenticateToken,getWishlist);
router.get("/wishlistProducts/:user_id",authenticateToken,getWishlistDetails);
//router.post("/address",authenticateToken,addUserDetails);

export default router;
