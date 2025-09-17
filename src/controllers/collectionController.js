import { getCollectionBannerById, getProductsByCollection } from "../models/collectionModel.js";

export const fetchProductsByCollection=async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(id);
        const products=await getProductsByCollection(id);
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}


export const fetchImagePrettyInPink=async(req,res)=>{
    try{
        const id='COL00000001';
        const image=await getCollectionBannerById(id);
        if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json({ collection_image: image });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}
export const fetchImageDenimDusk=async(req,res)=>{
    try{
        const id='COL00000002';
        const image=await getCollectionBannerById(id);
        if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json({ collection_image: image });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}
export const fetchImageDesertGlow=async(req,res)=>{
    try{
        const id='COL00000003';
        const image=await getCollectionBannerById(id);
        if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json({ collection_image: image });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}
export const fetchImageCrimsonFlame=async(req,res)=>{
    try{
        const id='COL00000004';
        const image=await getCollectionBannerById(id);
        if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json({ collection_image: image });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}