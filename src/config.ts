import { Connection } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

const RPC_URL = process.env.RPC_URL!;
const WSS_URL = process.env.WSS_URL!;

if (!RPC_URL || !WSS_URL) {
  throw new Error(
    "RPC_URL and WSS_URL must be defined in environment variables"
  );
}

export const connection = new Connection(RPC_URL, { wsEndpoint: WSS_URL });
