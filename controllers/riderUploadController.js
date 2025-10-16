// controllers/riderUploadController.js
import { Rider } from "../models/Rider.js";

export const uploadRiderDocuments = async (req, res, next) => {
  try {
    const riderId = req.user?.id; // From authMiddleware
    if (!riderId) return res.status(401).json({ message: "Unauthorized" });

    const rider = await Rider.findByPk(riderId);
    if (!rider) return res.status(404).json({ message: "Rider not found" });

    // Collect uploaded file paths
    const files = req.files;
    const updateData = {};

    if (files.passportPhoto) {
      updateData.passportPhoto = `/uploads/riders/${files.passportPhoto[0].filename}`;
    }
    if (files.vehiclePhoto) {
      updateData.vehiclePhoto = `/uploads/riders/${files.vehiclePhoto[0].filename}`;
    }
    if (files.idDocument) {
      updateData.idDocument = `/uploads/riders/${files.idDocument[0].filename}`;
    }

    // Update database record
    await rider.update(updateData);

    res.json({
      message: "Documents uploaded successfully",
      uploaded: updateData,
    });
  } catch (err) {
    next(err);
  }
};
