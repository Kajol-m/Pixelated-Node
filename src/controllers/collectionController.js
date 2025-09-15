import { getProductsByCollection } from "../models/collectionModel.js";

export const fetchProductsByCollection=async(req,res)=>{
    try{
        const {id}=req.params;
        const products=await getProductsByCollection(id);
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}