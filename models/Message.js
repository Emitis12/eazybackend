import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatId: { type: String, required: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  text: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Message = mongoose.model("Message", messageSchema);
