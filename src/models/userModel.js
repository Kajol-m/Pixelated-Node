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

export async function getUserDetails(user_id){
  const result=await pool.query(
    "SELECT * FROM user_details where user_id= ?",[user_id]
  );
 return result[0] || null;
}

export async function updateUserDetails(user_details) {
  const { user_id, user_name, phone, date_of_birth, gender } = user_details;

  const [result] = await pool.execute(
    `UPDATE user_details 
     SET user_name = ?, phone = ?, date_of_birth = ?, gender = ?
     WHERE user_id = ?`,
    [user_name, phone, date_of_birth, gender, user_id]
  );
  return result.affectedRows;
}


export async function getUserAddress(user_id){
  const result=await pool.query(
    "SELECT * FROM addresses where user_id= ?",[user_id]
  )
  return result[0] || null;
}
//add wishlistID
export async function productWishlistId() {
  try {
    // 1️⃣ Get the latest wishlist_id (in descending order)
    const [rows] = await pool.execute(
      "SELECT wishlist_id FROM wishlist ORDER BY wishlist_id DESC LIMIT 1"
    );

    let newIdNumber = 1;

    if (rows.length > 0) {
      // Extract numeric part, e.g. "WSL00000012" → 12
      const lastId = rows[0].wishlist_id;
      const numericPart = parseInt(lastId.replace("WSL", ""), 10);
      newIdNumber = numericPart + 1;
    }

    // 2️⃣ Format the new ID as "WSL00000001"
    const newWishlistId = "WSL" + String(newIdNumber).padStart(8, "0");

    return newWishlistId;
  } catch (err) {
    console.error("❌ Error generating wishlist ID:", err);
    throw err;
  }
}

export async function ifProductWishlistedByUser(user_id,product_id){
  const result=await pool.query(
    "SELECT * FROM wishlist WHERE user_id=? AND product_id=?",[user_id,product_id]
  );
  return result[0];
}
export async function addToWishlist(wishlist_details){
  const {wishlist_id,user_id,product_id}=wishlist_details;
  const [result]=await pool.execute(
    "INSERT INTO wishlist (wishlist_id,user_id,product_id) VALUES(?,?,?)",
    [wishlist_id,user_id,product_id]
  );
  return result.insertId;
}

export async function removeFromWishlist(wishlist_details){
  const {user_id,product_id}=wishlist_details;
  const [result]=await pool.execute(
    "DELETE FROM wishlist WHERE user_id=? AND product_id=?",
    [user_id,product_id]
  );
  return result.affectedRows;
}

