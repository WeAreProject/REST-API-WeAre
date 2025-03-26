import { Router } from "express";
import { registerPurchase,getPurchasesByCustomer,getPurchasesByBusiness,deletePurchase,updatePurchaseStatus } from "../controllers/registerPurchase.controller.js";


const router = Router();

router.post("/purchases", registerPurchase); 
router.get("/purchases/customer/:customer_id", getPurchasesByCustomer); 
router.get("/purchases/business/:business_id", getPurchasesByBusiness); 
router.delete("/purchases/:order_id", deletePurchase); 
router.put("/purchases/:order_id/status", updatePurchaseStatus);

export default router;
