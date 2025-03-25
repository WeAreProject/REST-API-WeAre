import { Router } from "express";
import { registerReview,getReviewsByBusiness } from "../controllers/reviews.controller.js";
const router = Router();

// Ruta para registrar una nueva reseña
router.post("/reviews/register", registerReview);
router.get("/reviews/:business_id", getReviewsByBusiness);

export default router;
