import express from "express";
import { createOffer, getOffers } from "../controllers/offerController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("vendor"));

router.post("/", createOffer);
router.get("/", getOffers);

export default router;
