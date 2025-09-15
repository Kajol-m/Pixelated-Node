import pool from "../config/db.js";

export async function createUser(user) {
  const { user_id, user_name, email, password } = user;
  const [result] = await pool.execute(
    "INSERT INTO user_details (user_id, user_name, email, password_hash) VALUES (?, ?, ?, ?)",
    [user_id, user_name, email, password]
  );
  return result.insertId;
}

export async function findUserByEmail(email) {
  const [rows] = await pool.execute("SELECT * FROM user_details WHERE email = ?", [email]);
  return rows[0];
}

export const getProductsByCollection=async(collectionId)=>{
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
