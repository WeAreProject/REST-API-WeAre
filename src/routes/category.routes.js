import { Router } from "express";
import { getCategories,getBusinessesAndServicesByCategory } from "../controllers/category.controller.js";

const router = Router();

router.get("/categories", getCategories);
router.get("/categories/:category", getBusinessesAndServicesByCategory);
export default router;
