import { getActiveToken } from "../utils/auth.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "") || getActiveToken().token;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
