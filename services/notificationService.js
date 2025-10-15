import { Notification } from "../models/Notification.js";

export async function createNotification(io, userId, message, type = "info") {
  const notification = await Notification.create({ userId, message, type });
  io.to(userId.toString()).emit("notification", notification);
  return notification;
}
