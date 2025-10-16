import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: false }, // may be null for system-wide (e.g., superadmin)
  role: { type: String, enum: ["superadmin", "admin", "vendor", "rider", "customer"], required: true },

  title: { type: String, required: true },
  message: { type: String, required: true },

  type: {
    type: String,
    enum: ["product_upload", "product_review", "product_approval", "order_update", "system"],
    default: "system",
  },

  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Notification = mongoose.model("Notification", notificationSchema);
