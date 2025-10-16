// controllers/vendorUploadController.js
import Vendor from "../models/Vendor.js";

/**
 * Upload vendor documents (passport, ID, shop photo)
 */
export const uploadVendorDocuments = async (req, res, next) => {
  try {
    const { vendorId } = req.params;

    const vendor = await Vendor.findByPk(vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    if (req.files.passportPhoto)
      vendor.passportPhoto = req.files.passportPhoto[0].path;

    if (req.files.idDocument)
      vendor.idDocument = req.files.idDocument[0].path;

    if (req.files.shopPhoto)
      vendor.shopPhoto = req.files.shopPhoto[0].path;

    await vendor.save();

    res.status(200).json({
      message: "Documents uploaded successfully",
      vendor,
    });
  } catch (error) {
    next(error);
  }
};
