import express from "express";
import { getRiderDashboard, getEarnings } from "../controllers/riderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("rider"));

router.get("/dashboard", getRiderDashboard);
router.get("/earnings", getEarnings);

export default router;
