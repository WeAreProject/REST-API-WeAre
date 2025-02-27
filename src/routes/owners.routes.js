import { Router } from "express";
import { registerOwner } from "../controllers/owners.controller.js";
import { uploadOwnerImage } from "../middlewares/upload.js";
const router = Router();

router.post("/owners/register", uploadOwnerImage.single("image"), registerOwner);

export default router;
