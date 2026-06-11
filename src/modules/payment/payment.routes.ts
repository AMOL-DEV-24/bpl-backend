import { Router } from "express";
import { createOrder, verifyPayment } from "./payment.controller";

const router = Router();

router.post("/create-order", createOrder); // body: { email }
router.post("/verify", verifyPayment); // body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }

export default router;
