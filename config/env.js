import dotenv from "dotenv";
dotenv.config();

/**
 * ===== Server & App Config =====
 */
export const PORT = process.env.PORT || 3002;
export const APP_URL = process.env.APP_URL || "http://localhost:5173";

/**
 * ===== PostgreSQL (Sequelize) =====
 */
export const POSTGRES_URI = process.env.POSTGRES_URI || "postgres://user:password@localhost:5432/eazydb";

/**
 * ===== MongoDB (Optional: Chat, Logs) =====
 */
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/eazy_chat";

/**
 * ===== JWT & Auth =====
 */
export const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

/**
 * ===== Twilio Config (WhatsApp OTP) =====
 */
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || "";

/**
 * ===== Optional: Other Third-Party Keys =====
 * e.g., Google OAuth, Payment gateways
 */
// export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
// export const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";
