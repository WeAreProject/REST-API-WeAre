import { Router } from "express";
import {
  registerService,
  getAllServices,
  getServiceById,
} from "../controllers/service.controller.js";
import { uploadServiceImage } from "../middlewares/upload.js";

const router = Router();

router.get("/services", getAllServices);
router.get("/services/:id", getServiceById);
router.post(
  "/services/register",
  uploadServiceImage.fields([{ name: "image", maxCount: 1 }]),
  registerService
);

export default router;
