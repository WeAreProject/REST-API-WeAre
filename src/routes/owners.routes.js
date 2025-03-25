import { Router } from "express";
import { registerOwner,getOwnerById } from "../controllers/owners.controller.js";
import { uploadOwnerImage } from "../middlewares/upload.js";
const router = Router();

router.post("/owners/register", uploadOwnerImage.single("image"), registerOwner);
router.get("/owners/:id", getOwnerById);

export default router;
