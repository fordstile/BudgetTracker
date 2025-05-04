// // backend/routes/setup.js

// import express from "express";

// const router = express.Router();

// // POST /api/setup
// router.post("/", (req, res) => {
//   const { income, savings, expenses } = req.body;

//   console.log("Received setup data:");
//   console.log("Income:", income);
//   console.log("Savings:", savings);
//   console.log("Expenses:", expenses);

//   res.status(200).json({ message: "Setup data received successfully" });
// });

// export default router;

// backend/routes/setupRoutes.js
// import express from "express";
// import { createSetup } from "../controllers/setupController.js";

// const router = express.Router();

// router.post("/", createSetup);

// export default router;

// import express from "express";
// import { saveSetupData } from "../controllers/setupController.js";

// const router = express.Router();

// router.post("/setup", saveSetupData);

// export default router;

// import express from "express";
// import { saveSetupData } from "../controllers/setupController.js";
// import { getSetupData } from "../controllers/setupController.js";

// const router = express.Router();

// router.post("/setup", saveSetupData);
// router.get("/setup", getSetupData);

// export default router;

import express from "express";
import { saveSetupData, getSetupData } from "../controllers/setupController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 Routes for setup — only accessible to logged-in users
router.post("/setup", protect, saveSetupData);
router.get("/setup", protect, getSetupData);

export default router;
