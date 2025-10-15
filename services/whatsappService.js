import twilioClient from "../config/twilio.js";

export async function sendWhatsAppOtp(phone, otp) {
  try {
    await twilioClient.messages.create({
      body: `Your Eazy OTP is: ${otp}`,
      from: "whatsapp:+14155238886", // Twilio sandbox
      to: `whatsapp:${phone}`,
    });
    console.log(`✅ OTP sent to ${phone}`);
  } catch (err) {
    console.error("WhatsApp OTP error:", err);
    throw new Error("Failed to send OTP");
  }
}
