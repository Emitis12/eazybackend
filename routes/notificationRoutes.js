import express from "express";
import { sendNotification } from "../controllers/notificationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", sendNotification);

export default router;
