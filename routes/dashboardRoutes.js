import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getDashboardStats);

export default router;
