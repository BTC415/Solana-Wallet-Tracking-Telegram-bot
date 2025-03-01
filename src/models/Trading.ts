import mongoose from "mongoose";

const tradingSchema = new mongoose.Schema({
  signature: { type: String, required: true, unique: true },
  signer: { type: String, required: true, index: true },
  isBuy: { type: Boolean, required: true, default: true },
  solAmount: { type: Number, required: true },
  tokenAddress: { type: String },
  tokenAmount: { type: Number },
  blockTime: { type: Date, required: true },
});

export const Trading = mongoose.model("Trading", tradingSchema);
