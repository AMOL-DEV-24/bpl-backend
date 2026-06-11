import { razorpayInstance } from "../../config/razorpay";
import { verifyRazorpaySignature } from "../../shared/utils/razorpay";
import { VerifyPaymentPayload } from "./payment.types";
import { Payment } from "./payment.model";

export const createOrderService = async (email: string) => {
  const order = await razorpayInstance.orders.create({
    amount: Number(process.env.RAZORPAY_AMOUNT) || 1000, // ₹10
    currency: process.env.RAZORPAY_CURRENCY || "INR",
    receipt: `bpl_${Date.now()}`,
  });

  // ✅ Save order to DB immediately
  await Payment.create({
    orderId: order.id,
    amount: 1000,
    playerEmail: email,
    status: "created",
  });

  return order;
};

// ✅ Now async + saves to DB on success
export const verifyPaymentService = async (payload: VerifyPaymentPayload) => {
  const isValid = verifyRazorpaySignature(
    payload.razorpay_order_id,
    payload.razorpay_payment_id,
    payload.razorpay_signature,
  );

  if (!isValid) return false;

  // ✅ Mark payment as paid in DB
  await Payment.findOneAndUpdate(
    { orderId: payload.razorpay_order_id },
    { paymentId: payload.razorpay_payment_id, status: "paid" },
  );

  return true;
};
