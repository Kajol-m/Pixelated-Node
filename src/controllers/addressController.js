import {
  addNewAddress,
  upadteAddress,
  deleteAddress,
  toggleDefault,
  getUserAddress,
  findAddressById,
} from "../models/addressModel.js";

export async function createNewAddress(req, res) {
  try {
    const user_id = req.user.user_id;
    const { address_type, street_address, city, state, postal_code, country } =
      req.body;
    const address_details = {
      user_id,
      address_type,
      street_address,
      city,
      state,
      postal_code,
      country,
    };

    const result = await addNewAddress(address_details);
    res.status(201).json({
      message: "Address added successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
    console.error("Error details:", err);
  }
}

export async function updateAddressDetails(req, res) {
  try {
    const user_id = req.user.user_id;
    const address_id=req.params.address_id;
    const {
      address_type,
      street_address,
      city,
      state,
      postal_code,
      country,
    } = req.body;
    const address_details = {
      address_type,
      street_address,
      city,
      state,
      postal_code,
      country,
      address_id,
      user_id,
    };
    const result = await upadteAddress(address_details);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
}

export async function deleteAddressDetails(req, res) {
  try {
    const user_id = req.user.user_id;
    const { address_id } = req.body;
    const result = deleteAddress(address_id, user_id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
}

export async function fetchUserAddress(req, res) {
  try {
    const user_id = req.user.user_id;
    const result = await getUserAddress(user_id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
}

export async function changeAddressType(req, res) {
  try {
    const user_id = req.user.user_id;
    const { address_id, is_default } = req.body;
    //const address_details = { user_id, address_id, is_default };

    const result = await toggleDefault({ address_id, user_id, is_default: 0 });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
    console.error("Error details:", err);
  }
}

export async function fetchOneAddress(req, res) {
  try {
    const { address_id } = req.params;     
    const user_id = req.user.user_id;  

    const address = await findAddressById(address_id, user_id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json(address);
  } catch (err) {
    console.error("Error fetching address:", err);
    res.status(500).json({ message: "Server error", details: err.message });
  }
}