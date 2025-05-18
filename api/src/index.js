import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";


const __dirname = path.resolve();


const app = express();
const PORT = process.env.PORT || 5000;



//! 1- middleware:
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, //! allow frontend to send cookies
  })
);
app.use(express.json());
app.use(cookieParser());

//! 2- routes:
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

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
