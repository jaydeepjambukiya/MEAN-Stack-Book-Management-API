import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bookRouter from "./Router/BookRouter.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

// Book Routes
app.use("/api/books", bookRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("Hello, World! This is the backend server.");
});

// MongoDB Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

connect();

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://${HOSTNAME}:${PORT}`);
});
