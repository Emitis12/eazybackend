import { Order } from "../models/Order.js";
import { assignOrderToRider } from "../services/riderAssignmentService.js";

export async function createOrder(req, res, next) {
  try {
    const order = await Order.create({ ...req.body, userId: req.user.id });
    res.json(order);
  } catch (err) {
    next(err);
  }
}

export async function assignOrder(req, res, next) {
  try {
    const order = await assignOrderToRider(req.app.get("io"), req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
}

export async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.json(orders);
  } catch (err) {
    next(err);
  }
}
