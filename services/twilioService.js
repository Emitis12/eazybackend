// twilioService.js
import Twilio from "twilio";
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER } from "../config/env.js";

const client = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

/**
 * Send OTP via WhatsApp
 * @param {string} to - Recipient number in format +234XXXXXXXXXX
 * @param {string} otp - OTP code
 */
export const sendWhatsAppOtp = async (to, otp) => {
  try {
    const message = await client.messages.create({
      from: TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${to}`,
      body: `Your Eazy OTP is: ${otp}`,
    });
    console.log(`✅ WhatsApp OTP sent to ${to}: SID ${message.sid}`);
    return message;
  } catch (err) {
    console.error("❌ Failed to send WhatsApp OTP:", err.message);
    throw new Error("Unable to send OTP. Please try again.");
  }
};
