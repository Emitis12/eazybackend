// routes/vendorUploadRoutes.js
import express from "express";
import { uploadVendorDocuments } from "../controllers/vendorUploadController.js";
import { createUploader } from "../middlewares/uploadMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();
const upload = createUploader("vendors");

// ✅ Apply authentication and role check
router.use(authMiddleware, roleMiddleware("vendor"));

// ✅ Upload documents (passport, ID, shop photo)
router.post(
  "/:vendorId/upload-documents",
  upload.fields([
    { name: "passportPhoto", maxCount: 1 },
    { name: "idDocument", maxCount: 1 },
    { name: "shopPhoto", maxCount: 1 },
  ]),
  uploadVendorDocuments
);

export default router;
