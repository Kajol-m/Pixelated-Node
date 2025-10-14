import { getAllTops,  getAllBottoms, getAllDresses, getAllSkirts, getAllAccessories, getAllClothing, getProductsByCategory } from "../models/filterModel.js";

export const fetchAllTops=async(req,res)=>{
    try{
        const products=await getAllTops();
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server error"});
    }
};

export const fetchAllBottoms=async(req,res)=>{
    try{
        const products=await getAllBottoms();
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server error"});
    }
};

export const fetchAllDresses=async(req,res)=>{
    try{
        const products=await getAllDresses();
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server error"});
    }
};

export const fetchAllSkirts=async(req,res)=>{
    try{
        const products=await getAllSkirts();
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server error"});
    }
};

export const fetchAllAccessories=async(req,res)=>{
    try{
        const products=await getAllAccessories();
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server error"});
    }
};

export const fetchAllClothing=async(req,res)=>{
    try{
        const products=await getAllClothing();
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server error"});
    }
};

export const fetchProductsByCategory=async(req,res)=>{
    try{
        const {category}=req.params;
        const  products=await getProductsByCategory(category);
        res.json(products);
    }catch(err){
     console.error(err);
     res.status(500).json({message:'Server error'})
    }
}


