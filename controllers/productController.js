import { Product } from "../models/Product.js";
import { Notification } from "../models/Notification.js";
import { sendMail } from "../services/emailService.js";

/**
 * @desc Vendor creates a product (goes under review)
 */
export async function createProduct(req, res, next) {
  try {
    const { name, description, price, imageUrl, location } = req.body;

    // ✅ Create product (auto sets isApproved = false)
    const product = await Product.create({
      name,
      description,
      price,
      imageUrl,
      location,
      vendorId: req.user.id,
      isApproved: false,
    });

    // ✅ Notify SuperAdmin of new product
    await Notification.create({
      title: "New Product Uploaded",
      message: `A new product "${product.name}" was uploaded by Vendor ID: ${req.user.id}.`,
      role: "superadmin",
      type: "product_upload",
    });

    // ✅ (Optional) send email alert to SuperAdmin
    await sendMail({
      to: process.env.SUPERADMIN_EMAIL,
      subject: "New Product Uploaded for Review",
      html: `<p>A new product "<strong>${product.name}</strong>" has been uploaded by a vendor and is pending your review.</p>
             <p>Login to your SuperAdmin dashboard to approve or reject it.</p>`,
    });

    // ✅ Notify vendor of submission
    await Notification.create({
      title: "Product Submitted for Review",
      message: `Your product "${product.name}" is under review. Approval typically takes 30 mins to 1 hour.`,
      role: "vendor",
      userId: req.user.id,
      type: "product_review",
    });

    // ✅ Send immediate frontend feedback
    res.json({
      success: true,
      message: "Product submitted successfully. It’s now under review (30 mins to 1 hour).",
      product,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @desc Get all products for logged-in vendor
 */
export async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll({ where: { vendorId: req.user.id } });
    res.json(products);
  } catch (err) {
    next(err);
  }
}

/**
 * @desc SuperAdmin approves a product
 */
export async function approveProduct(req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.isApproved = true;
    await product.save();

    // ✅ Notify vendor
    await Notification.create({
      title: "Product Approved",
      message: `Your product "${product.name}" has been approved and is now live.`,
      role: "vendor",
      userId: product.vendorId,
      type: "product_approval",
    });

    // ✅ Send email alert to vendor
    await sendMail({
      to: product.vendor?.businessEmail,
      subject: "Product Approved & Live",
      html: `<p>Your product "<strong>${product.name}</strong>" has been approved and is now live on Eazy.</p>`,
    });

    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
}
