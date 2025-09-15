import pool from "../config/db.js"
export const getProductsByCollection=async(collectionId)=>{
  try{
    const [rows]=await pool.query(
    `SELECT p.product_id,p.product_name,p.price,i.image_id,i.image_url,i.display_order,i.is_primary
    FROM product_details p LEFT JOIN product_images i ON p.product_id=i.product_id
    WHERE p.collection_id=?`,
    [collectionId]
  );

  const products={};
  rows.forEach((row)=>{
    if (!products[row.product_id]) {
      products[row.product_id] = {
        product_id: row.product_id,
        product_name: row.product_name,
        price: row.price,
        images: [],
      };
    }
    products[row.product_id].images.push({
      url: row.image_url,
      display_order: row.display_order,
      is_primary: row.is_primary,
    });
  });

  return Object.values(products);
}
catch(err){
    console.error("SQL Error:",err);
    throw err;
}
}
