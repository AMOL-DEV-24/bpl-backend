import { razorpayInstance } from "../../config/razorpay";
import { verifyRazorpaySignature } from "../../shared/utils/razorpay";
import { VerifyPaymentPayload } from "./payment.types";
import { Payment } from "./payment.model";

/**
 * =========================
 * CREATE ORDER SERVICE
 * =========================
 */
export const createOrderService = async (email: string) => {
  const amount = Number(process.env.RAZORPAY_AMOUNT ?? 1000);
  const currency = process.env.RAZORPAY_CURRENCY ?? "INR";

  const order = await razorpayInstance.orders.create({
    amount,
    currency,
    receipt: `bpl_${Date.now()}`,
  });

  // Save order in DB (initial state)
  await Payment.create({
    orderId: order.id,
    amount,
    playerEmail: email,
    status: "created",
  });

  return order;
};

/**
 * =========================
 * VERIFY PAYMENT SERVICE
 * =========================
 */
export const verifyPaymentService = async (
  payload: VerifyPaymentPayload
) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = payload;

  const isValid = verifyRazorpaySignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );

  if (!isValid) {
    return false;
  }

  // Update payment record
  const updated = await Payment.findOneAndUpdate(
    { orderId: razorpay_order_id },
    {
      paymentId: razorpay_payment_id,
      status: "paid",
    },
    { new: true }
  );

  // extra safety check
  if (!updated) {
    throw new Error("Payment record not found in DB");
  }

  return true;
};