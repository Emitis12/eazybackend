import express from "express";
import {
  approveVendor,
  approveRider,
  approveProduct,
  getAnalytics
} from "../controllers/superAdminController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Only superadmin can access these routes
router.use(authMiddleware, roleMiddleware("superadmin"));

router.patch("/approve-vendor/:id", approveVendor);
router.patch("/approve-rider/:id", approveRider);
router.patch("/approve-product/:id", approveProduct);
router.get("/analytics", getAnalytics);

export default router;
