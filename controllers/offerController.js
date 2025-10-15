import { Offer } from "../models/Offer.js";

export async function createOffer(req, res, next) {
  try {
    const offer = await Offer.create({ ...req.body, vendorId: req.user.id });
    res.json(offer);
  } catch (err) {
    next(err);
  }
}

export async function getOffers(req, res, next) {
  try {
    const offers = await Offer.findAll({ where: { vendorId: req.user.id } });
    res.json(offers);
  } catch (err) {
    next(err);
  }
}
