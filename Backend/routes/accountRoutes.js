// import express from "express";
// import {
//   addPaymentMethod,
//   getPaymentMethods,
//   deletePaymentMethod,
// } from "../controllers/accountController.js";
// // import { protect } from "../middleware/authMiddleware.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Routes for accounts
// router.post("/", protect, addPaymentMethod);
// router.post("/accounts", protect, addPaymentMethod);

// router.get("/", protect, getPaymentMethods);
// router.delete("/:id", protect, deletePaymentMethod);

// export default router;

// import express from "express";
// import {
//   addPaymentMethod,
//   getPaymentMethods,
//   deletePaymentMethod,
// } from "../controllers/accountController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Routes for accounts
// router.post("/", protect, addPaymentMethod); // POST request to add a payment method
// router.get("/", protect, getPaymentMethods); // GET request to retrieve payment methods
// router.delete("/:id", protect, deletePaymentMethod); // DELETE request to remove a payment method

// export default router;

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
router.patch("/:id/set-default", protect, setDefaultMethod); // ✅ Set default method

export default router;
