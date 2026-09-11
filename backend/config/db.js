import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MONGO_URI is missing in backend/.env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      family: 4, // prefer IPv4 — Windows localhost (::1) often hangs
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    console.error(
      "If you use Atlas, whitelist your current IP. If local MongoDB, confirm it is running on 27017."
    );
    process.exit(1);
  }
};
