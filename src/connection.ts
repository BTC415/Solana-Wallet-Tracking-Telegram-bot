import mongoose from "mongoose";

export const connectDB = async (mongodb_url: string) => {
  await mongoose.connect(mongodb_url);
  console.log("📦 MongoDB Connected");
};
