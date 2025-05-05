import express from "express";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

//! 1- middleware:
app.use(express.json());

//! 2- routes:

app.use("/api/v1/auth", authRoutes);

//!3- listen to the port:
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is Running on port: ${PORT}`);
});

//!4- function to handle errors:
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
