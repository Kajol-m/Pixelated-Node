import pool from "../config/db.js";

export const getTrendingItems = async () => {
  try {
    const [rows] = await pool.query(`
        SELECT p.product_id,p.product_name,p.price,i.image_id,i.image_url,i.display_order,i.is_primary,
        t.trending_points,
        t.collection_id,
        t.category_id,
        t.rank_position

        FROM trending_items t JOIN product_details p ON t.product_id=p.product_id LEFT JOIN product_images i ON p.product_id=i.product_id AND i.display_order IN (1, 2)
        ORDER BY t.rank_position ASC

            `);

    const trendingItems = {};
    rows.forEach((row) => {
      if (!trendingItems[row.product_id]) {
        trendingItems[row.product_id] = {
          product_id: row.product_id,
          product_name: row.product_name,
          price: row.price,
          collection_id: row.collection_id,
          category_id: row.category_id,
          rank_position: row.rank_position,
          trending_points: row.trending_points,
          images: [],
        };
      }
      if (row.image_url) {   // only push if there is an image
    trendingItems[row.product_id].images.push({
      url: row.image_url,
      display_order: row.display_order,
      is_primary: row.is_primary,
    });
  }
    });
    return Object.values(trendingItems);
  } catch (err) {
    console.error("SQL Error:", err);
    throw err;
  }
};

export const getAllTrendingItems = async () => {
  try {
    const [rows] = await pool.query(`
        SELECT p.product_id,p.product_name,p.price,i.image_id,i.image_url,i.display_order,i.is_primary,
        t.trending_points,
        t.collection_id,
        t.category_id,
        t.rank_position

        FROM trending_items t JOIN product_details p ON t.product_id=p.product_id LEFT JOIN product_images i ON p.product_id=i.product_id AND i.display_order IN (1, 2)
        ORDER BY t.rank_position ASC
        LIMIT 22

            `);

    const trendingItems = {};
    rows.forEach((row) => {
      if (!trendingItems[row.product_id]) {
        trendingItems[row.product_id] = {
          product_id: row.product_id,
          product_name: row.product_name,
          price: row.price,
          collection_id: row.collection_id,
          category_id: row.category_id,
          rank_position: row.rank_position,
          trending_points: row.trending_points,
          images: [],
        };
      }
      if (row.image_url) {   // only push if there is an image
    trendingItems[row.product_id].images.push({
      url: row.image_url,
      display_order: row.display_order,
      is_primary: row.is_primary,
    });
  }
    });
    return Object.values(trendingItems);
  } catch (err) {
    console.error("SQL Error:", err);
    throw err;
  }
};
