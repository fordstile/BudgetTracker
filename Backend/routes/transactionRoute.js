// import express from "express";
// import {
//   getTransactions,
//   addTransaction,
//   deleteTransaction,
// } from "../controllers/transactionController.js";

// const router = express.Router();

// router.get("/", getTransactions);
// router.post("/", addTransaction);
// router.delete("/:id", deleteTransaction);

// export default router;

import express from "express";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Add 'protect' middleware
router.get("/", protect, getTransactions);
router.post("/", protect, addTransaction);
router.delete("/:id", protect, deleteTransaction);

export default router;
