import { Message } from "../models/Message.js";

export async function sendMessage(req, res, next) {
  try {
    const message = await Message.create({ ...req.body, senderId: req.user.id });
    req.app.get("io").to(req.body.receiverId).emit("newMessage", message);
    res.json(message);
  } catch (err) {
    next(err);
  }
}

export async function getMessages(req, res, next) {
  try {
    const { chatId } = req.params;
    const messages = await Message.findAll({ where: { chatId } });
    res.json(messages);
  } catch (err) {
    next(err);
  }
}
