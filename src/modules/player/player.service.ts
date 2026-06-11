import { Player } from "./player.model";
import { Payment } from "../payment/payment.model";
import ApiError from "../../utils/apiError";
import { calculatePagination } from "../../utils/pagination";

const createPlayerIntoDB = async (payload: any) => {
  const { email, mobile, orderId } = payload;

  // 🔍 1. Verify Payment
  const payment = await Payment.findOne({
    orderId,
    status: "paid",
  });

  if (!payment) {
    throw new ApiError(400, "Payment not verified. Registration blocked.");
  }

  // 🔍 2. Duplicate check
  const existing = await Player.findOne({
    $or: [{ email }, { mobile }],
  });

  if (existing) {
    throw new ApiError(409, "Player already registered.");
  }

  // 💾 3. Create Player
  const player = await Player.create({
    ...payload,
    paymentStatus: "success",
    paymentId: payment.paymentId,
    status: "pending",
  });

  return player;
};

// 📦 GET ALL PLAYERS (pagination + A-Z sort)
const getAllPlayersFromDB = async (page: number, limit: number) => {
  const { skip } = calculatePagination(page, limit);

  const players = await Player.find()
    .sort({ firstName: 1 }) // A → Z sorting
    .skip(skip)
    .limit(limit);

  const total = await Player.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: players,
  };
};

// 📦 APPROVED PLAYERS ONLY
const getApprovedPlayersFromDB = async (page: number, limit: number) => {
  const { skip } = calculatePagination(page, limit);

  const players = await Player.find({ status: "approved" })
    .sort({ firstName: 1 })
    .skip(skip)
    .limit(limit);

  const total = await Player.countDocuments({ status: "approved" });

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: players,
  };
};

// ✅ APPROVE PLAYER
const approvePlayerIntoDB = async (id: string) => {
  const player = await Player.findByIdAndUpdate(
    id,
    { status: "approved" },
    { new: true }
  );

  if (!player) {
    throw new ApiError(404, "Player not found");
  }

  return player;
};

// ❌ REJECT PLAYER
const rejectPlayerIntoDB = async (id: string) => {
  const player = await Player.findByIdAndUpdate(
    id,
    { status: "rejected" },
    { new: true }
  );

  if (!player) {
    throw new ApiError(404, "Player not found");
  }

  return player;
};

export const PlayerService = {
  createPlayerIntoDB,
  getAllPlayersFromDB,
  getApprovedPlayersFromDB,
  approvePlayerIntoDB,
  rejectPlayerIntoDB,
};