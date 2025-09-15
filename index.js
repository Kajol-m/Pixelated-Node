import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import collectionRoutes from "./src/routes/collectionRoutes.js";
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const PORT=5000;

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products",collectionRoutes);

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
