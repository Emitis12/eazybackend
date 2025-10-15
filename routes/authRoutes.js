import express from "express";
import {
  register,
  login,
  sendOtp,
  verifyOtpController,
  refreshTokenController
} from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

// Auth endpoints
router.post("/register", validateRequest, register);
router.post("/login", validateRequest, login);
router.post("/send-otp", validateRequest, sendOtp);
router.post("/verify-otp", validateRequest, verifyOtpController);
router.post("/refresh-token", validateRequest, refreshTokenController);

export default router;
