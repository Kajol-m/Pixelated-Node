import pool from "../config/db.js";

export async function orderItemsId() {
  try {
    // 1️⃣ Get the latest wishlist_id (in descending order)
    const [rows] = await pool.execute(
      "SELECT order_item_id FROM order_items ORDER BY order_item_id DESC LIMIT 1"
    );

    let newIdNumber = 1;

    if (rows.length > 0) {
      // Extract numeric part, e.g. "OIT00000012" → 12
      const lastId = rows[0].order_item_id;
      const numericPart = parseInt(lastId.replace("OIT", ""), 10);
      newIdNumber = numericPart + 1;
    }

    // 2️⃣ Format the new ID as "OIT00000001"
    const newOrderItemId = "OIT" + String(newIdNumber).padStart(8, "0");

    return newOrderItemId;
  } catch (err) {
    console.error("❌ Error generating wishlist ID:", err);
    throw err;
  }
}

export async function addToCart(user_id, product_id, size, color,quantity,price) {
  const order_item_id =await orderItemsId();
  const [result] = await pool.execute("INSERT INTO order_items (order_item_id,product_id,quantity,unit_price,total_price,user_id,size,color) VALUES (?,?,?,?,?,?,?,?)",[order_item_id,product_id,quantity,price,quantity*price,user_id,size,color]);
  return result.insertId;
}

export async function getCartProduct(user_id){
  const [result]=await pool.query("SELECT p.product_id,p.product_name,c.unit_price,c.order_item_id,c.user_id,c.total_price,c.size,c.color,i.image_id,i.image_url FROM order_items AS c JOIN product_details AS p ON c.product_id = p.product_id JOIN product_images AS i ON p.product_id = i.product_id WHERE c.user_id = ? AND i.is_primary = 1;",[user_id]);

  return result;
}

export async function removeFromCart(user_id,product_id){
  const [result] = await pool.execute("DELETE FROM order_items WHERE user_id=? AND product_id=?;",[user_id,product_id]);

  return result;
}