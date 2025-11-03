import {
  registerUser,
  loginUser,
  productWishlist,
} from "../services/userService.js";
import {
  getUserAddress,
  getUserDetails,
  updateUserDetails,
  removeFromWishlist,
} from "../models/userModel.js";
import pool from "../config/db.js";
import jwt from 'jsonwebtoken';

//Register User
export async function register(req, res) {
  try {
    const { user_name, email, password } = req.body;

    if (!user_name || !email || !password) {
      return res.status(400).json({
        code: "VALIDATION_ERROR",
        message: "All fields are required",
      });
    }

    const user = await registerUser(user_name, email, password);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "Something went wrong",
    });
  }
}

//Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        code: "VALIDATION_ERROR",
        message: "Email and password are required",
      });
    }

    const result = await loginUser(email, password);

    //setting refreshToken as Http Only Cookie
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "Something went wrong",
    });
  }
}

//refreshToken endpoint
export async function refreshAccessToken(req, res) {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }
    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      console.log("✅ Token verified:", payload);
    } catch (e) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }
    const newAccessToken = jwt.sign(
      { user_id: payload.user_id, email: payload.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // short lived
    );
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export function logout(req, res) {
  res.clearCookie("refreshToken", { path: "/" });
  return res.json({ message: "Logged out" });
}

//Get User Deatils
export async function fetchUserDetails(req, res) {
  try {
    const userId = req.user.user_id;
    const result = await getUserDetails(userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
}


export async function addUserDetails(req, res) {
  try {
    const user_id = req.user.user_id;
    const { user_name, phone, date_of_birth, gender } = req.body;
    const user_details = { user_id, user_name, phone, date_of_birth, gender };
    const result = await updateUserDetails(user_details);
    res.json({ success: true, affected: result });
  } catch (err) {
    console.error("addUserDetails Error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  }
}


export async function fetchUserAddress(req, res) {
  try {
    const userId = req.user.user_id;
    const result = await getUserAddress(userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
}

export async function setWishlist(req, res) {
  try {
    const { user_id, product_id } = req.body;
    const wishlist = await productWishlist(user_id, product_id);
    res.status(201).json({
      message: "Added to Wishlist",
      wishlist,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "Something went wrong",
    });
  }
}

export async function removeWishlist(req, res) {
  try {
    const { user_id, product_id } = req.body;
    const wishlist = await removeFromWishlist({ user_id, product_id });
    res.status(201).json({
      message: "Removed from wishlist",
      wishlist,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "Something went wrong",
    });
  }
}

// ✅ Controller: getWishlist.js
export async function getWishlist(req, res) {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({
        code: "BAD_REQUEST",
        message: "Missing user_id parameter",
      });
    }

    const [rows] = await pool.execute(
      "SELECT product_id FROM wishlist WHERE user_id = ?",
      [user_id]
    );

    // ✅ Fix: use r.product_id, not register.product_id
    const wishlistItems = rows.map((r) => r.product_id);

    return res.status(200).json({ wishlist: wishlistItems });
  } catch (err) {
    console.error("❌ Error fetching wishlist:", err);
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch wishlist items",
    });
  }
}

//get wishlist product details
export async function getWishlistDetails(req, res) {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({
        code: "BAD_REQUEST",
        message: "Missing user_id parameter",
      });
    }

    // ✅ Step 1: Fetch all products wishlisted by this user, including images
    const [rows] = await pool.query(
      `
      SELECT 
        p.product_id,
        p.product_name,
        p.price,
        i.image_id,
        i.image_url,
        i.display_order,
        i.is_primary
      FROM wishlist w
      JOIN product_details p 
        ON w.product_id = p.product_id
      LEFT JOIN product_images i 
        ON p.product_id = i.product_id 
        AND i.display_order IN (1, 2)
      WHERE w.user_id = ?
      ORDER BY p.product_id, i.display_order ASC
      `,
      [user_id]
    );

    // ✅ Step 2: Transform flat rows into grouped structure
    const wishlistMap = {};

    rows.forEach((row) => {
      if (!wishlistMap[row.product_id]) {
        wishlistMap[row.product_id] = {
          product_id: row.product_id,
          product_name: row.product_name,
          price: row.price,
          images: [],
        };
      }

      if (row.image_url) {
        wishlistMap[row.product_id].images.push({
          url: row.image_url,
          display_order: row.display_order,
          is_primary: row.is_primary,
        });
      }
    });

    // ✅ Step 3: Return as array
    const wishlistProducts = Object.values(wishlistMap);

    return res.status(200).json({ wishlist: wishlistProducts });
  } catch (err) {
    console.error("❌ Error fetching wishlist details:", err);
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch wishlist product details",
    });
  }
}
