import { getBestsellerProducts, getAllBestsellerProducts } from "../models/bestsellerModel.js";

export const fetchBestsellerItems=async(req,res)=>{
    try{
        const products=await getBestsellerProducts();
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server erroe"});
    }
};

export const fetchAllBestsellerItems=async(req,res)=>{
    try{
        const products=await getAllBestsellerProducts();
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server erroe"});
    }
};