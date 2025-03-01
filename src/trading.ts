import { NATIVE_MINT } from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import { sendTelegramMessage } from "./telegram.js";
import { Trading } from "./models/Trading.js";
import { formatCryptoAddress } from "./lib/format.js";

import { connection } from "./config.js";

const explorerUrl = "https://solscan.io/tx/";
const walletUrl = `https://solscan.io/account/`;

////  You are using Helius RPC connection
export const subscribeTrading = (key: string) => {
  console.log("Subscribe to trading events for key:", key);
  const anaylzeSignature = async (log: any) => {
    txn = await connection.getParsedTransaction(signature, {
      maxSupportedTransactionVersion: 0,
      commitment: "confirmed",
    });

    if (!txn) {
      console.log(`Failed to fetch transaction after ${attempt} attempts`);
      return;
    }

    console.log("predata", txn.meta.preTokenBalances);
    console.log("posttokendata", txn.meta.postTokenBalances);
    console.log("loaced addresses", txn.meta.innerInstructions);

    // Process the transaction data

    const message = `
🔔 <b>New Transaction Detected!</b>

👛 <b>Wallet:</b> <a href="${walletUrl + signer}">${formatCryptoAddress(
      signer
    )}</a>

💰 <b>Sol Amount:</b> ${solAmount > 0 ? "📥 SELL" : "📤 BUY"} ${Math.abs(
      solAmount
    ).toFixed(3)} SOL

💸 <b>PNL for this Token:</b> ${totalPNL.toFixed(3)} SOL

🚀 <b>Token:</b> <a href="${walletUrl + tradingData.tokenAddress
      }">${tokenInfo}</a>

🔗 <a href="${explorerUrl + signature}">View Transaction</a>

⏰ ${new Date().toLocaleString()}
`;

    await sendTelegramMessage(message);

  };
  return connection.onLogs(new PublicKey(key), anaylzeSignature, "processed");
};

const getDeltaAmount = (signer: string, preData: any[], postData: any[]) => {
  console.log("signers", signer);
  console.log("preData");
  console.log("postData");
  console.log("mints", significantMints);
};
