import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/authRoutes.js";
import superadminRoutes from "./routes/superadminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import riderRoutes from "./routes/riderRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

// Middleware
import { errorHandler } from "./middlewares/errorHandler.js";

// Jobs
import { notifyPremiumUsers } from "./jobs/emailAlerts.js";

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

// ===== API Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/superadmin", superadminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/riders", riderRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/chat", chatRoutes);

// ===== Error Handling =====
app.use(errorHandler);

// ===== Optional: Start Email Alert Job on App Startup =====
setInterval(() => {
  notifyPremiumUsers().catch((err) => console.error("Email Alerts Job Error:", err));
}, 1000 * 60 * 5); // Every 5 minutes

export default app;
