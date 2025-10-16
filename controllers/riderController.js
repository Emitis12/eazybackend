import { Rider } from "../models/Rider.js";
import { Order } from "../models/Order.js";

/**
 * Get rider dashboard overview
 */
export async function getRiderDashboard(req, res, next) {
  try {
    const rider = await Rider.findByPk(req.user.id);
    const orders = await Order.findAll({ where: { riderId: rider.id } });
    res.json({ rider, orders });
  } catch (err) {
    next(err);
  }
}

/**
 * Get rider earnings
 */
export async function getEarnings(req, res, next) {
  try {
    const rider = await Rider.findByPk(req.user.id);
    const earnings = await Order.sum("totalAmount", { where: { riderId: rider.id } });
    res.json({ earnings });
  } catch (err) {
    next(err);
  }
}

/**
 * ✅ Update rider online/offline status
 */
export async function updateRiderStatus(req, res, next) {
  try {
    const { riderId } = req.params;
    const { online } = req.body;

    // Validate
    if (typeof online !== "boolean") {
      return res.status(400).json({ message: "Invalid online status format" });
    }

    const rider = await Rider.findByPk(riderId);
    if (!rider) {
      return res.status(404).json({ message: "Rider not found" });
    }

    rider.online = online;
    await rider.save();

    // Optional: emit socket event if needed (if ioInstance exists globally)
    if (global.ioInstance) {
      global.ioInstance.emit("rider_status_change", { riderId, online });
    }

    res.json({
      message: `Rider is now ${online ? "online" : "offline"}`,
      online: rider.online
    });
  } catch (err) {
    next(err);
  }
}
