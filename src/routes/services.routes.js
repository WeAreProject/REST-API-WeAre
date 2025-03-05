import { Router } from "express";
import {
  getServices,
  createService,
  updateService,
  deleteServices,
  getService
} from "../controllers/services.controller.js";
import { uploadServiceImage } from "../middlewares/upload.js";

const router = Router();

router.get('/services', getServices);

router.get('/services/:id', getService);

router.post("/services", uploadServiceImage.single("image"), createService); 

router.patch('/services/:id', updateService);

router.delete('/services/:id', deleteServices);

export default router;
