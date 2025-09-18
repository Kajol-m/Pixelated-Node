import pool from "../config/db.js";

export const getAllTops = async () => {
  try {
    const [rows] = await pool.query(`
            SELECT p.product_id,p.product_name,p.price,i.image_id,i.image_url,i.display_order,i.is_primary
    FROM product_details p LEFT JOIN product_images i ON p.product_id=i.product_id
    WHERE p.category_id='CAT00000001'
            `);
    const products = {};
    rows.forEach((row) => {
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
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllBottoms = async () => {
  try {
    const [rows] = await pool.query(`
            SELECT p.product_id,p.product_name,p.price,i.image_id,i.image_url,i.display_order,i.is_primary
    FROM product_details p LEFT JOIN product_images i ON p.product_id=i.product_id
    WHERE p.category_id='CAT00000002'
            `);
    const products = {};
    rows.forEach((row) => {
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
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllDresses = async () => {
  try {
    const [rows] = await pool.query(`
            SELECT p.product_id,p.product_name,p.price,i.image_id,i.image_url,i.display_order,i.is_primary
    FROM product_details p LEFT JOIN product_images i ON p.product_id=i.product_id
    WHERE p.category_id='CAT00000003'
            `);
    const products = {};
    rows.forEach((row) => {
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
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllSkirts = async () => {
  try {
    const [rows] = await pool.query(`
            SELECT p.product_id,p.product_name,p.price,i.image_id,i.image_url,i.display_order,i.is_primary
    FROM product_details p LEFT JOIN product_images i ON p.product_id=i.product_id
    WHERE p.category_id='CAT00000004'
            `);

    const products = {};
    rows.forEach((row) => {
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
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getAllAccessories = async () => {
  try {
    const [rows] = await pool.query(`
            SELECT p.product_id,p.product_name,p.price,i.image_id,i.image_url,i.display_order,i.is_primary
    FROM product_details p LEFT JOIN product_images i ON p.product_id=i.product_id
    WHERE p.category_id='CAT00000005'
            `);

    const products = {};
    rows.forEach((row) => {
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
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllClothing = async () => {
  try {
    const [rows] = await pool.query(`
            SELECT p.product_id,p.product_name,p.price,i.image_id,i.image_url,i.display_order,i.is_primary
    FROM product_details p LEFT JOIN product_images i ON p.product_id=i.product_id
    WHERE p.category_id!='CAT00000005'
            `);

    const products = {};
    rows.forEach((row) => {
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
  } catch (err) {
    console.error(err);
    throw err;
  }
};
