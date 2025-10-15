import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import { User } from "../models/User.js";
import { Vendor } from "../models/Vendor.js";
import { Rider } from "../models/Rider.js";
import { generateOtp, verifyOtp } from "../utils/otp.js";
import { sendWhatsAppOtp } from "./whatsappService.js";

export async function registerUser(data, role = "customer") {
  const { email, password, phone } = data;

  const hashed = await bcrypt.hash(password, 10);

  let user;
  switch (role) {
    case "vendor":
      user = await Vendor.create({ ...data, password: hashed });
      break;
    case "rider":
      user = await Rider.create({ ...data, password: hashed });
      break;
    default:
      user = await User.create({ ...data, password: hashed });
  }

  const token = jwt.sign({ id: user.id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { user, token };
}

export async function loginUser(emailOrPhone, password, role = "customer") {
  let user;
  switch (role) {
    case "vendor":
      user = await Vendor.findOne({ where: { email: emailOrPhone } });
      break;
    case "rider":
      user = await Rider.findOne({ where: { email: emailOrPhone } });
      break;
    default:
      user = await User.findOne({ where: { email: emailOrPhone } });
  }

  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { user, token };
}

export async function sendOtpToUser(phone) {
  const otp = generateOtp();
  const expiry = Date.now() + 5 * 60 * 1000; // 5 mins
  await sendWhatsAppOtp(phone, otp);
  return { otp, expiry };
}

export async function verifyUserOtp(phone, otpInput) {
  const valid = await verifyOtp(phone, otpInput);
  if (!valid) throw new Error("Invalid or expired OTP");
  return true;
}

export async function refreshJwtToken(userId, role) {
  const token = jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return token;
}
