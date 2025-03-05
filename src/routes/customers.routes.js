import { Router } from "express";
import { registerCustomer } from "../controllers/Customer.controller.js";
import { uploadOwnerImage } from "../middlewares/upload.js";

const router = Router();

router.post("/customers/register", uploadOwnerImage.single("image"), registerCustomer);

export default router;

