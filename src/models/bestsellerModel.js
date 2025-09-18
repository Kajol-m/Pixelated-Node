import pool from "../config/db.js";

export const getBestsellerProducts = async () => {
  try {
    const [rows] = await pool.query(`
SELECT p.product_id,p.product_name,p.price,i.image_id,i.image_url,i.display_order,i.is_primary,
        b.collection_id,
        b.category_id,
        b.rank_position

        FROM bestseller b JOIN product_details p ON b.product_id=p.product_id LEFT JOIN product_images i ON p.product_id=i.product_id AND i.display_order IN (1, 2)
        ORDER BY b.rank_position ASC

            `);

    const bestsellerItems = {};
    rows.forEach((row) => {
      if (!bestsellerItems[row.product_id]) {
        bestsellerItems[row.product_id] = {
          product_id: row.product_id,
          product_name: row.product_name,
          price: row.price,
          collection_id: row.collection_id,
          category_id: row.category_id,
          rank_position: row.rank_position,
          images: [],
        };
      }
      if (row.image_url) {
        bestsellerItems[row.product_id].images.push({
          url: row.image_url,
          display_order: row.display_order,
          is_primary: row.is_primary,
        });
      }
    });
    return Object.values(bestsellerItems);
  } catch (err) {
    console.error("SQL Error:", err);
    throw err;
  }
};

export const getAllBestsellerProducts = async () => {
  try {
    const [rows] = await pool.query(`
SELECT p.product_id,p.product_name,p.price,i.image_id,i.image_url,i.display_order,i.is_primary,
        b.collection_id,
        b.category_id,
        b.rank_position

        FROM bestseller b JOIN product_details p ON b.product_id=p.product_id LEFT JOIN product_images i ON p.product_id=i.product_id AND i.display_order IN (1, 2)
        ORDER BY b.rank_position ASC

            `);

    const bestsellerItems = {};
    rows.forEach((row) => {
      if (!bestsellerItems[row.product_id]) {
        bestsellerItems[row.product_id] = {
          product_id: row.product_id,
          product_name: row.product_name,
          price: row.price,
          collection_id: row.collection_id,
          category_id: row.category_id,
          rank_position: row.rank_position,
          images: [],
        };
      }
      if (row.image_url) {
        bestsellerItems[row.product_id].images.push({
          url: row.image_url,
          display_order: row.display_order,
          is_primary: row.is_primary,
        });
      }
    });
    return Object.values(bestsellerItems);
  } catch (err) {
    console.error("SQL Error:", err);
    throw err;
  }
};
