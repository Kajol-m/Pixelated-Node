// import express from "express";
// import dotenv from "dotenv";
// import userRoutes from "./src/routes/userRoutes.js";
// import collectionRoutes from "./src/routes/collectionRoutes.js";
// import trendingRoutes from "./src/routes/trendingRoutes.js"
// import bestsellerRoutes from "./src/routes/bestsellerRoutes.js";
// import filterRoutes from "./src/routes/filterRoutes.js";
// import orderRoutes from "./src/routes/orderRoutes.js"
// import cors from 'cors';
// import pool from "./src/config/db.js";
// import cookieParser from "cookie-parser";

// dotenv.config();
// const app = express();
// app.use(cookieParser());
// app.use(express.json());
// // CORS configuration
// const allowedOrigins = [
//   'http://localhost:5173',
//   'http://localhost:5174',
//   'http://localhost:3000',
//   'https://pixelated-kajol.netlify.app', // your production frontend
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // allow requests with no origin (like Postman)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       return callback(new Error('Not allowed by CORS'), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// app.options('*', cors(corsOptions));
// app.use(cors(corsOptions));
// const PORT=5000;

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/products",collectionRoutes);
// app.use("/api/trending",trendingRoutes);
// app.use("/api/bestseller",bestsellerRoutes);
// app.use("/api/products",filterRoutes);
// app.use("/api",orderRoutes);
// app.get("/api/products/:id/images", async (req, res) => {
//   const productId = req.params.id;

//   try {
//     const [rows] = await pool.query(
//       `SELECT image_id, image_url, image_alt_text, display_order
//        FROM product_images
//        WHERE product_id = ?
//        ORDER BY display_order ASC`,
//       [productId]
//     );

//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch product images" });
//   }
// });


// app.get("/api/products/:id", async (req, res) => {
//   const productId = req.params.id;

//   try {
//     // 1️⃣ Fetch basic product info
//     const [productRows] = await pool.query(
//       `SELECT product_id, product_name, price, discount_price, product_description, category_id, collection_id, brand
//        FROM product_details
//        WHERE product_id = ?`,
//       [productId]
//     );

//     if (productRows.length === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     const product = productRows[0];

//     // 2️⃣ Fetch product images
//     const [imageRows] = await pool.query(
//       `SELECT image_id, image_url, image_alt_text, display_order
//        FROM product_images
//        WHERE product_id = ?
//        ORDER BY display_order ASC`,
//       [productId]
//     );

//     // 3️⃣ Fetch available variants (size & color)
//     const [variantRows] = await pool.query(
//       `SELECT DISTINCT color, size
//        FROM product_variants
//        WHERE product_id = ? AND stock_quantity > 0`,
//       [productId]
//     );

//     // 4️⃣ Group variants by color
//     const colors = [];
//     const colorMap = {};

//     variantRows.forEach((v) => {
//       if (!colorMap[v.color]) {
//         colorMap[v.color] = [];
//       }
//       colorMap[v.color].push(v.size);
//     });

//     for (const color in colorMap) {
//       colors.push({ color, sizes: colorMap[color] });
//     }

//     // 5️⃣ Combine and send
//     res.json({
//       ...product,
//       images: imageRows,
//       colors, // array of { color: string, sizes: string[] }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch product details" });
//   }
// });


// app.listen(PORT, () => {
//   console.log("Server running on port 5000");
// });
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import pool from "./src/config/db.js";

import userRoutes from "./src/routes/userRoutes.js";
import collectionRoutes from "./src/routes/collectionRoutes.js";
import trendingRoutes from "./src/routes/trendingRoutes.js";
import bestsellerRoutes from "./src/routes/bestsellerRoutes.js";
import filterRoutes from "./src/routes/filterRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";

dotenv.config();
const app = express();

// 🔹 Middleware
app.use(cookieParser());
app.use(express.json());

// ✅ Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://pixelated-kajol.netlify.app", // production frontend
  "https://pixelated-kajol.vercel.app",
  "https://pixelated.kajolmurmu.com"
];

// ✅ Robust CORS setup (handles credentials + preflight safely)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // 🔸 Respond immediately to OPTIONS preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// 🔹 Routes
app.use("/api/users", userRoutes);
app.use("/api/products", collectionRoutes);
app.use("/api/trending", trendingRoutes);
app.use("/api/bestseller", bestsellerRoutes);
app.use("/api/products", filterRoutes);
app.use("/api", orderRoutes);

// 🔹 Fetch product images
app.get("/api/products/:id/images", async (req, res) => {
  const productId = req.params.id;
  try {
    const [rows] = await pool.query(
      `SELECT image_id, image_url, image_alt_text, display_order
       FROM product_images
       WHERE product_id = ?
       ORDER BY display_order ASC`,
      [productId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch product images" });
  }
});

// 🔹 Fetch single product details
app.get("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const [productRows] = await pool.query(
      `SELECT product_id, product_name, price, discount_price, product_description, category_id, collection_id, brand
       FROM product_details
       WHERE product_id = ?`,
      [productId]
    );

    if (productRows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = productRows[0];
    const [imageRows] = await pool.query(
      `SELECT image_id, image_url, image_alt_text, display_order
       FROM product_images
       WHERE product_id = ?
       ORDER BY display_order ASC`,
      [productId]
    );
    const [variantRows] = await pool.query(
      `SELECT DISTINCT color, size
       FROM product_variants
       WHERE product_id = ? AND stock_quantity > 0`,
      [productId]
    );

    const colorMap = {};
    variantRows.forEach((v) => {
      if (!colorMap[v.color]) colorMap[v.color] = [];
      colorMap[v.color].push(v.size);
    });
    const colors = Object.entries(colorMap).map(([color, sizes]) => ({
      color,
      sizes,
    }));

    res.json({ ...product, images: imageRows, colors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch product details" });
  }
});

// 🔹 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
