import { connectDB } from "./connection.js";
import { subscribeTrading } from "./trading.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;
const wallet_address = process.env.WALLET_ADDRESS!;

connectDB(MONGODB_URI);

subscribeTrading(wallet_address);

console.log("🚀 Trading monitor initializing...");
