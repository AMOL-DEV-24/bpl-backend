import crypto from "crypto";

export const verifyRazorpaySignature = (
  orderId: string,
  paymentId: string,
  signature: string
) => {
  const generatedSignature = crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET as string
    )
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature;
};