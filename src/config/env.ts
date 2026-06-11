import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {  // ← fixed MONGO_URI → MONGODB_URI
  throw new Error("MONGODB_URI is missing in .env file");
}

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGODB_URI,  // ← fixed here too
  razorpayKeyId: process.env.RAZORPAY_KEY_ID,
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,
  jwtSecret: process.env.JWT_SECRET,
};