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

