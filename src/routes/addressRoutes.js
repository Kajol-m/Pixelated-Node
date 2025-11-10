import { Router } from "express";
import {createNewAddress,updateAddressDetails,deleteAddressDetails,fetchUserAddress,changeAddressType, fetchOneAddress} from "../controllers/addressController.js";
import { authenticateToken } from "../middlewares/validate.js";

const router=Router();

router.post("/address",authenticateToken,createNewAddress);
router.patch("/address", authenticateToken, updateAddressDetails);
router.delete("/address",authenticateToken,deleteAddressDetails);
router.get("/address",authenticateToken,fetchUserAddress);
router.put("/address/default",authenticateToken,changeAddressType);
router.get("/address/:address_id", authenticateToken, fetchOneAddress);


export default router;
