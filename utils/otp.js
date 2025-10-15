import crypto from "crypto";

export const generateOtp = (length = 6, expiryMinutes = 10) => {
  const code = crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
  const expiry = new Date(Date.now() + expiryMinutes * 60 * 1000); // expires in 10 min
  return { code, expiry };
};

export const verifyOtpCode = (user, code) => {
  if (!user.otpCode || !user.otpExpiry) return false;
  const now = new Date();
  if (now > new Date(user.otpExpiry)) return false;
  return user.otpCode === code;
};
