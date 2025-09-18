import { getTrendingItems, getAllTrendingItems } from "../models/trendingModel.js";

export const fetchTrendingItems=async(req,res)=>{
    try{
        const products=await getTrendingItems();
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server erroe"});
    }
};

export const fetchAllTrendingItems=async(req,res)=>{
    try{
        const products=await getAllTrendingItems();
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server erroe"});
    }
};