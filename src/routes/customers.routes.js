import { Router } from "express";
import {
  registerCustomer,
  getCustomers,
  getCustomerById,
  deleteCustomer,
  loginCustomer 
} from "../controllers/Customer.controller.js";
import { uploadOwnerImage } from "../middlewares/upload.js";

const router = Router();


router.post(
  "/customers/register",
  uploadOwnerImage.single("image"),
  registerCustomer
);
router.post("/customers/login", loginCustomer);  // <-- Agregar ruta de login
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerById);
router.delete("/customers/:id", deleteCustomer);

export default router;
