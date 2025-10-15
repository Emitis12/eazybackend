import { Vendor } from "../models/Vendor.js";
import { Rider } from "../models/Rider.js";
import { Product } from "../models/Product.js";
import { sendEmail } from "../services/emailService.js";
import { User } from "../models/User.js";

export async function approveVendor(req, res, next) {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findByPk(id);
    if (!vendor) throw new Error("Vendor not found");
    vendor.approved = true;
    await vendor.save();
    await sendEmail(vendor.businessEmail, "Vendor Approved", "<p>You are approved!</p>");
    res.json(vendor);
  } catch (err) {
    next(err);
  }
}

export async function approveRider(req, res, next) {
  try {
    const { id } = req.params;
    const rider = await Rider.findByPk(id);
    if (!rider) throw new Error("Rider not found");
    rider.approved = true;
    await rider.save();
    await sendEmail(rider.email, "Rider Approved", "<p>You are approved!</p>");
    res.json(rider);
  } catch (err) {
    next(err);
  }
}

export async function approveProduct(req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    product.approved = true;
    await product.save();
    const vendor = await Vendor.findByPk(product.vendorId);
    await sendEmail(vendor.businessEmail, "Product Approved", `<p>Your product ${product.name} is live.</p>`);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function getAnalytics(req, res, next) {
  try {
    const users = await User.count();
    const vendors = await Vendor.count();
    const riders = await Rider.count();
    const products = await Product.count();
    res.json({ users, vendors, riders, products });
  } catch (err) {
    next(err);
  }
}
