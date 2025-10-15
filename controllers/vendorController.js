import { Vendor } from "../models/Vendor.js";
import { Product } from "../models/Product.js";
import { Order } from "../models/Order.js";

export async function getVendorDashboard(req, res, next) {
  try {
    const vendor = await Vendor.findByPk(req.user.id);
    const orders = await Order.findAll({ where: { vendorId: vendor.id } });
    res.json({ vendor, orders });
  } catch (err) {
    next(err);
  }
}

export async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll({ where: { vendorId: req.user.id } });
    res.json(products);
  } catch (err) {
    next(err);
  }
}
