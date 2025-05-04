// routes/dashboard.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Dummy protected dashboard route
router.get("/", protect, (req, res) => {
  res.status(200).json({
    message: `Welcome back, ${req.user.name}!`,
    user: {
      name: req.user.name,
      email: req.user.email,
    },
  });
});

export default router;
