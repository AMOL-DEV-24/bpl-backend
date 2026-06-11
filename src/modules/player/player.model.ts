import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    mobile: { type: String, required: true, unique: true },
    village: { type: String, trim: true },
    age: { type: Number, required: true, min: 10, max: 60 },
    jerseyNumber: { type: String },
    role: {
      type: String,
      required: true,
      enum: ["Batsman", "Bowler", "All Rounder", "Wicket Keeper"],
    },
    battingStyle: {
      type: String,
      required: true,
      enum: ["Right Hand Bat", "Left Hand Bat"],
    },
    bowlingStyle: {
      type: String,
      required: true,
      enum: ["Fast", "Medium", "Spin"],
    },
    experience: { type: String, default: "0" },
    stats: {
      matches: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      strikeRate: { type: Number, default: 0 },
      economy: { type: Number, default: 0 },
      catches: { type: Number, default: 0 },
    },
    about: { type: String },
    imageUrl: { type: String, required: true },

    // Payment
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paymentId: { type: String },
    orderId: { type: String },

    // Admin approval — ✅ ADDED
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Player = mongoose.model("Player", playerSchema);
