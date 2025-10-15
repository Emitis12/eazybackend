import { Rider } from "../models/Rider.js";
import { Order } from "../models/Order.js";

export async function getRiderDashboard(req, res, next) {
  try {
    const rider = await Rider.findByPk(req.user.id);
    const orders = await Order.findAll({ where: { riderId: rider.id } });
    res.json({ rider, orders });
  } catch (err) {
    next(err);
  }
}

export async function getEarnings(req, res, next) {
  try {
    const rider = await Rider.findByPk(req.user.id);
    const earnings = await Order.sum("totalAmount", { where: { riderId: rider.id } });
    res.json({ earnings });
  } catch (err) {
    next(err);
  }
}
