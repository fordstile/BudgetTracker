import express from "express";
import {
  addPaymentMethod,
  getPaymentMethods,
  deletePaymentMethod,
  setDefaultMethod, // ✅ Import it here
} from "../controllers/accountController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for accounts
router.post("/", protect, addPaymentMethod); // Add a payment method
router.get("/", protect, getPaymentMethods); // Get user's payment methods
router.delete("/:id", protect, deletePaymentMethod); // Delete a method
router.patch("/:id/set-default", protect, setDefaultMethod); // Set default method

export default router;
