import { Router } from "express";
import {
  registerService,
  getAllServices,
  getServiceById,
  getServicesByBusinessId,
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
router.get("/services/business/:business_id", getServicesByBusinessId); 

export default router;
