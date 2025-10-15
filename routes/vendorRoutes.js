import express from "express";
import { getVendorDashboard, getProducts } from "../controllers/vendorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("vendor"));

router.get("/dashboard", getVendorDashboard);
router.get("/products", getProducts);

export default router;
