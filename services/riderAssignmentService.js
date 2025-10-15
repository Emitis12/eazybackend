import { Order } from "../models/Order.js";
import { Rider } from "../models/Rider.js";

export async function assignOrderToRider(io, orderId) {
  const order = await Order.findByPk(orderId);
  if (!order) throw new Error("Order not found");

  const rider = await Rider.findOne({ where: { status: "available" } });
  if (!rider) throw new Error("No available rider");

  order.riderId = rider.id;
  order.status = "assigned";
  await order.save();

  io.to(rider.id.toString()).emit("newDelivery", order);
  return order;
}
