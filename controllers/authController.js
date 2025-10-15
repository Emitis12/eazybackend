import { registerUser, loginUser, sendOtpToUser, verifyUserOtp, refreshJwtToken } from "../services/authService.js";
import { sendEmail } from "../services/emailService.js";

export async function register(req, res, next) {
  try {
    const { role } = req.body;
    const result = await registerUser(req.body, role);
    await sendEmail(result.user.email, "Welcome to Eazy!", `<p>Your account is created.</p>`);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { emailOrPhone, password, role } = req.body;
    const result = await loginUser(emailOrPhone, password, role);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function sendOtp(req, res, next) {
  try {
    const { phone } = req.body;
    const result = await sendOtpToUser(phone);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function verifyOtpController(req, res, next) {
  try {
    const { phone, otp } = req.body;
    const valid = await verifyUserOtp(phone, otp);
    res.json({ success: valid });
  } catch (err) {
    next(err);
  }
}

export async function refreshTokenController(req, res, next) {
  try {
    const { userId, role } = req.body;
    const token = await refreshJwtToken(userId, role);
    res.json({ token });
  } catch (err) {
    next(err);
  }
}
