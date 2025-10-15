import nodemailer from "nodemailer";
import { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

export async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({ from: EMAIL_USER, to, subject, html });
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error("Email send error:", err);
  }
}
