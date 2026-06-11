import { Request, Response } from "express";
import { createOrderService, verifyPaymentService } from "./payment.service";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const order = await createOrderService(email);

    return res.status(200).json({
      success: true,
      message: "Order created",
      data: order,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create order" });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    // ✅ await added
    const isVerified = await verifyPaymentService(req.body);

    if (!isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Verification failed" });
  }
};
