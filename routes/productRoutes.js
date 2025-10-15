import express from "express";
import { createProduct, getProducts } from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("vendor"));

router.post("/", createProduct);
router.get("/", getProducts);

export default router;
