import { Router } from 'express';
import { registerBusiness } from '../controllers/Business.controller.js';
import { uploadBusinessImage } from '../middlewares/upload.js';
import { getBusinesses, getBusinessById } from '../controllers/Business.controller.js';

const router = Router();

router.post("/businesses/register", uploadBusinessImage.fields([
    { name: 'image', maxCount: 1 },
    { name: 'professional_license', maxCount: 1 }
  ]), registerBusiness);

router.get("/businesses", getBusinesses);
router.get("/businesses/:id", getBusinessById);

export default router;