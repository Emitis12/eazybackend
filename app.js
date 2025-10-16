import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// ===== Resolve __dirname in ES Modules =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Routes =====
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
import vendorUploadRoutes from "./routes/vendorUploadRoutes.js";
import riderUploadRoutes from "./routes/riderUploadRoutes.js";

// ===== Middleware =====
import { errorHandler } from "./middlewares/errorHandler.js";

// ===== Jobs =====
import { notifyPremiumUsers } from "./jobs/emailAlerts.js";

const app = express();

// ===== Core Middleware =====
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

// ===== Serve Uploaded Files (Static) =====
// Enables viewing uploaded rider/vendor files from browser if needed
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

// ✅ Newly added upload routes
app.use("/api/vendor", vendorUploadRoutes);
app.use("/api/rider", riderUploadRoutes);

// ===== Error Handling =====
app.use(errorHandler);

// ===== Optional: Background Job (Email Alerts) =====
setInterval(() => {
  notifyPremiumUsers().catch((err) =>
    console.error("Email Alerts Job Error:", err)
  );
}, 1000 * 60 * 5); // Every 5 minutes

export default app;
