import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: String,
  message: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Notification = mongoose.model("Notification", notificationSchema);
