// routes/riderUploadRoutes.js
import express from "express";
import { upload } from "../middlewares/uploadMiddleware.js";
import { uploadRiderDocuments } from "../controllers/riderUploadController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// ✅ Rider uploads multiple documents
router.post(
  "/upload-documents",
  authMiddleware,
  roleMiddleware("rider"),
  upload.fields([
    { name: "passportPhoto", maxCount: 1 },
    { name: "vehiclePhoto", maxCount: 1 },
    { name: "idDocument", maxCount: 1 },
  ]),
  uploadRiderDocuments
);

export default router;
