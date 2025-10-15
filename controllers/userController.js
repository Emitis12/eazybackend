import { User } from "../models/User.js";

export async function getProfile(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id);
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
}
