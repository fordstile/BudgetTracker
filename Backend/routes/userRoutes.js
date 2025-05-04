import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserProfile);
router.put("/update", protect, updateUserProfile);
router.patch("/change-password", protect, changePassword);

export default router;
