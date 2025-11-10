import pool from "../config/db.js";

async function generateAddressId() {
  const [[{ last_id }]] = await pool.query(`
    SELECT MAX(address_id) AS last_id FROM addresses
  `);

  if (!last_id) return "ADR00000001";

  const num = parseInt(last_id.replace("ADR", ""), 10) + 1;
  return `ADR${num.toString().padStart(8, "0")}`;
}

export async function addNewAddress(address_details){
  const {user_id,address_type,street_address,city,state,postal_code,country}=address_details;
  const address_id = await generateAddressId();
  const [result]= await pool.execute("INSERT INTO addresses (address_id,user_id,address_type,street_address,city,state,postal_code,country) VALUES (?,?,?,?,?,?,?,?)",[address_id,user_id,address_type,street_address,city,state,postal_code,country]);
  return result.insertId;
}

export async function upadteAddress(address_details){
  const {address_id,user_id,address_type,street_address,city,state,postal_code,country}=address_details;

  const [result]=await pool.execute(`UPDATE addresses SET address_type=?,street_address=?,city=?,state=?,postal_code=?,country=? WHERE address_id=? AND user_id=?`,[address_type,street_address,city,state,postal_code,country,address_id,user_id]);

  return result.affectedRows;
}

export async function deleteAddress(address_id,user_id){

  const [result]= await pool.execute(`DELETE FROM addresses WHERE address_id=? AND user_id=?`,[address_id,user_id]);

  return result.affectedRows;
}
export async function getUserAddress(user_id){
  const result=await pool.query(
    "SELECT * FROM addresses where user_id= ?",[user_id]
  )
  return result[0] || null;
}

export async function toggleDefault({ address_id, user_id, is_default }) {
  is_default = is_default === 0 ? 1 : 0;

  if (is_default === 1) {
    await pool.execute(
      `UPDATE addresses SET is_default = 0 WHERE user_id = ?`,
      [user_id]
    );
  }

  const [result] = await pool.execute(
    `UPDATE addresses SET is_default = ? WHERE address_id = ? AND user_id = ?`,
    [is_default, address_id, user_id]
  );

  return result.affectedRows;
}
export async function findAddressById(address_id, user_id) {
  const [[address]] = await pool.execute(
    `SELECT * FROM addresses WHERE address_id = ? AND user_id = ?`,
    [address_id, user_id]
  );
  return address;
}