import express from "express";
import { createOrder, getOrders, assignOrder } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createOrder);
router.get("/", getOrders);
router.patch("/assign/:id", assignOrder);

export default router;
