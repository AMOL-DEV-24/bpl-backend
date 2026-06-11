import { Request, Response } from "express";
import {
  createOrderService,
  verifyPaymentService,
} from "./payment.service";

import AppError from "../../utils/apiError";
import { catchAsync } from "../../utils/catchAsynch";
import { sendResponse } from "../../utils/sendResponse";

/**
 * =========================
 * CREATE ORDER
 * =========================
 */
export const createOrder = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      throw new AppError(400, "Email is required");
    }

    const order = await createOrderService(email);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order created successfully",
      data: order,
    });
  }
);

/**
 * =========================
 * VERIFY PAYMENT
 * =========================
 */
export const verifyPayment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await verifyPaymentService(req.body);

    if (!result) {
      throw new AppError(
        400,
        "Payment verification failed"
      );
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Payment verified successfully",
      data: result,
    });
  }
);