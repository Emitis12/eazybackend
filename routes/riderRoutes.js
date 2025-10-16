import express from "express";
import {
  getRiderDashboard,
  getEarnings,
  updateRiderStatus
} from "../controllers/riderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// ✅ Apply auth and role checks for all rider routes
router.use(authMiddleware, roleMiddleware("rider"));

// ✅ Rider dashboard overview
router.get("/dashboard", getRiderDashboard);

// ✅ Rider earnings / wallet info
router.get("/earnings", getEarnings);

// ✅ Update rider online/offline status
router.patch("/:riderId/status", updateRiderStatus);

export default router;
