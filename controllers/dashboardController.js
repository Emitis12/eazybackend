import { User } from "../models/User.js";
import { Vendor } from "../models/Vendor.js";
import { Rider } from "../models/Rider.js";
import { Product } from "../models/Product.js";
import { Order } from "../models/Order.js";

export async function getDashboardStats(req, res, next) {
  try {
    const users = await User.count();
    const vendors = await Vendor.count();
    const riders = await Rider.count();
    const products = await Product.count();
    const orders = await Order.count();
    res.json({ users, vendors, riders, products, orders });
  } catch (err) {
    next(err);
  }
}
