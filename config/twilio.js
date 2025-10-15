import twilio from "twilio";
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from "./env.js";

export const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
