import { Product } from "../models/Product.js";

export async function createProduct(req, res, next) {
  try {
    const product = await Product.create({ ...req.body, vendorId: req.user.id });
    res.json(product);
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
