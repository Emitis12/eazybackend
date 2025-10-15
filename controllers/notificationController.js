import { createNotification } from "../services/notificationService.js";

export async function sendNotification(req, res, next) {
  try {
    const { userId, message, type } = req.body;
    const notification = await createNotification(req.app.get("io"), userId, message, type);
    res.json(notification);
  } catch (err) {
    next(err);
  }
}
