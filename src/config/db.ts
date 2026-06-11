import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI as string;

    if (!uri) throw new Error("MONGODB_URI missing in .env!");

    await mongoose.connect(uri, {
      family: 4,
    });

    console.log("==================================");
    console.log("🟢 DATABASE STATUS: CONNECTED ✅");
    console.log("🗄️  HOST:", mongoose.connection.host);
    console.log("📦 DB NAME:", mongoose.connection.name);
    console.log("==================================");
  } catch (error) {
    console.log("==================================");
    console.log("🔴 DATABASE STATUS: FAILED");
    console.error(error);
    console.log("==================================");
    process.exit(1);
  }
};