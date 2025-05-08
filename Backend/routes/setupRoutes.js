import express from "express";
import { saveSetupData, getSetupData } from "../controllers/setupController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for setup — only accessible to logged-in users
router.post("/setup", protect, saveSetupData);
router.get("/setup", protect, getSetupData);

export default router;
