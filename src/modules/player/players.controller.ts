import { Request, Response } from "express";
import { Player } from "./player.model";
import { Payment } from "../payment/payment.model";

// POST /api/v1/player/register
export const createPlayer = async (req: Request, res: Response) => {
  try {
    const { email, mobile, orderId } = req.body;

    // ✅ 1. Verify payment from DB — cannot be faked via req.body
    const payment = await Payment.findOne({ orderId, status: "paid" });

    if (!payment) {
      return res.status(400).json({
        success: false,
        message: "Payment not verified. Registration blocked.",
      });
    }

    // ✅ 2. Prevent duplicate
    const existing = await Player.findOne({ $or: [{ email }, { mobile }] });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Player already registered with this email or mobile.",
      });
    }

    // ✅ 3. Save — status defaults to "pending" (admin must approve)
    const player = await Player.create({
      ...req.body,
      paymentStatus: "success",
      paymentId: payment.paymentId,   // ← add this
    });

    return res.status(201).json({
      success: true,
      message: "Player registered. Awaiting admin approval.",
      data: player,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// GET /api/v1/player — BPL Hub admin (all players)
export const getAllPlayers = async (_req: Request, res: Response) => {
  try {
    const players = await Player.find().sort({ createdAt: -1 });
    res.json({ success: true, data: players });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/player/approved — BPL Official public list
export const getApprovedPlayers = async (_req: Request, res: Response) => {
  try {
    const players = await Player.find({ status: "approved" }).sort({ createdAt: -1 });
    res.json({ success: true, data: players });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/v1/player/:id/approve — BPL Hub admin
export const approvePlayer = async (req: Request, res: Response) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!player) return res.status(404).json({ success: false, message: "Player not found." });
    res.json({ success: true, message: "Player approved.", data: player });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// PATCH /api/v1/player/:id/reject — BPL Hub admin
export const rejectPlayer = async (req: Request, res: Response) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.json({ success: true, message: "Player rejected.", data: player });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};