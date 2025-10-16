import express from "express";
import {
  createProduct,
  getProducts,
  approveProduct,
} from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

/**
 * ===============================
 * VENDOR ROUTES
 * ===============================
 */
router.use(authMiddleware, roleMiddleware("vendor"));

// Vendor uploads product
router.post("/", createProduct);

// Vendor gets all their products
router.get("/", getProducts);

/**
 * ===============================
 * SUPERADMIN ROUTES
 * ===============================
 */
router.patch(
  "/:id/approve",
  authMiddleware,
  roleMiddleware("superadmin"),
  approveProduct
);

export default router;
