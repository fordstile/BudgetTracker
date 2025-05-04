import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // Ensure the correct path
import authRoutes from "./routes/authRoutes.js"; // Ensure the correct path
import dashboardRoutes from "./routes/dashboard.js";
import accountRoutes from "./routes/accountRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
//import setupRoute from "./routes/setupRoute.js";
import setupRoutes from "./routes/setupRoutes.js";
import transactionRoutes from "./routes/transactionRoute.js";

dotenv.config();
connectDB();
//await mongoose.connect(MONGO_URI); // remove useNewUrlParser and useUnifiedTopology

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend dev URL
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/accounts", accountRoutes);
// app.use("/api/user", require("./routes/userRoutes"));
//app.use("api/", setupRoute);
app.use("/api", setupRoutes);
app.use("/api/transactions", transactionRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
