import { Order } from "../models/Order.js";
import { assignOrderToRider } from "../services/riderAssignmentService.js";
import { creditVendorWallet, creditRiderWallet, calculateDeliveryFee } from "../services/walletService.js";

/**
 * Create a new order
 * Automatically calculates delivery fee based on distanceKm
 */
export async function createOrder(req, res, next) {
  try {
    const { distanceKm, ...rest } = req.body;

    // Calculate delivery fee for rider
    const deliveryFee = distanceKm ? calculateDeliveryFee(distanceKm) : 0;

    const order = await Order.create({
      ...rest,
      userId: req.user.id,
      deliveryFee
    });

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

/**
 * Complete order and credit wallets
 * Automatically deducts 20% service charge for both vendor and rider
 */
export async function completeOrder(req, res, next) {
  try {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Update order status
    order.status = "completed";
    await order.save();

    // ----- Wallet updates -----
    // Credit vendor with service charge deduction
    const vendorResult = await creditVendorWallet(
      order.vendorId,
      order.totalAmount,
      `Order #${order.id} completed`
    );

    // Credit rider with delivery fee minus service charge
    let riderResult = null;
    if (order.riderId && order.deliveryFee) {
      riderResult = await creditRiderWallet(order.riderId, order.deliveryFee);
    }

    res.json({
      message: "Order completed and wallets updated",
      order,
      vendorWallet: vendorResult,
      riderWallet: riderResult
    });
  } catch (error) {
    next(error);
  }
}
