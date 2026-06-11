import { Router } from "express";

import paymentRoutes from "../../modules/payment/payment.routes";
import playerRoutes from "../../modules/player/player.routes";

const router = Router();

// 
router.use("/payment", paymentRoutes);

//
router.use("/player", playerRoutes);

export default router;