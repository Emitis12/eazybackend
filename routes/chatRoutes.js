import express from "express";
import { sendMessage, getMessages } from "../controllers/chatController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", sendMessage);
router.get("/:chatId", getMessages);

export default router;
