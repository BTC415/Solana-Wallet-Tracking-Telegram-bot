# Solana Wallet Tracking Telegram bot

A comprehensive guide to building a professional Solana wallet tracking system that monitors transactions and delivers real-time notifications through Telegram.

## Introduction

In the fast-moving world of Solana trading, staying informed about wallet activities is crucial. This guide will walk you through creating a sophisticated wallet tracking bot that monitors transactions and sends detailed notifications via Telegram.

## System Architecture

The system consists of three main components:

1. Helius RPC for transaction monitoring
2. MongoDB for data storage
3. Telegram Bot for notifications

## Step-by-Step Guide

### 1. Setting Up Your Telegram Bot

First, we'll create and configure your Telegram bot for notifications.

#### Creating your own Telegram bot

1. Open Telegram and search for the @BotFather.
2. Send `/newbot` command
3. Name your bot (Example: "super_wallet_tracking_bot")
4. Save your bot token

#### Configuring Chat IDs
Now we named our bot and get bot token, we need to get our chat ID.

To get your chat ID:

1. Add your bot to your channel
2. Send a message
3. Access: https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
4. Extract the chat_id from the response

Or you can use this script to get your chat ID:

``` bash
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.on("message", (msg) => {
  console.log("New chat ID:", msg.chat.id);

  TELEGRAM_CHAT_ID = msg.chat.id.toString();
});
```

#### Environment Configuration

Add these to your .env file:

``` bash
TELEGRAM_BOT_NAME = "super_wallet_tracking_bot"
TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"
TELEGRAM_CHAT_ID = "YOUR_CHAT_ID"
```

Once we set environment variables, create a `telegram.ts` file and write the following code to send messsages to Telegram:

``` bash
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

export const sendTelegramMessage = async (message: string) => {
  try {
    await bot.sendMessage(TELEGRAM_CHAT_ID, message, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
  }
};
```

### 2.Integrating Helius RPC

Helius provides reliable RPC endpoints for Solana transaction monitoring.

Setup Steps:

1. Get your Helius API key from [Helius Dashboard](https://dashboard.helius.dev/)
2. Configure RPC endpoints in .env:

``` bash
RPC_URL = "https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY"
WSS_URL = "wss://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY"
```

### 3. Database Configuration and connection to MongoDB
We use  MongoDB for storing transaction history and analysis.

Configuration:

``` bash
MONGODB_URI = "mongodb://localhost:27017/solana_wallet_tracking"
```

Create `db.ts` file, and write the following code:
``` bash
import mongoose from "mongoose";

export const connectDB = async (mongodb_url: string) => {
  await mongoose.connect(mongodb_url);
  console.log("📦 MongoDB Connected");
};
```

### 4. Wallet Monitoring

Configure the wallet address you want to monitor:

``` bash
WALLET_ADDRESS = "YOUR_WALLET_ADDRESS"
```

### 5. Solana Connection Setup with Helius RPC

We need to establish communication with the Solana blockchain through Helius RPC endpoints.

Create `connection.ts` file, and write the following code:

``` bash
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
```

This creates a Connection instance that provides:

- HTTP-based RPC calls for transaction queries
- WebSocket connection for real-time transaction monitoring
- Automatic reconnection handling
- Connection state management

### 6. Transaction Analysis

The system monitors:

- Transaction signatures
- Token transfers
- Buy/Sell operations
- Amount changes
- Timestamps

We need to get transaction data from Helius RPC and processes this data and analyze signature in detail :

Create `trading.ts` file, and write the following code:

``` bash
import { NATIVE_MINT } from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import { sendTelegramMessage } from "./telegram.js";
import { Trading } from "./models/Trading.js";
import { formatCryptoAddress } from "./lib/format.js";

import { connection } from "./config.js";

const explorerUrl = "https://solscan.io/tx/";
const walletUrl = `https://solscan.io/account/`;

export const subscribeTrading = (key: string) => {
    const anaylzeSignature = async (log: any) => {
      txn = await connection.getParsedTransaction(signature, {
             maxSupportedTransactionVersion: 0,
            commitment: "confirmed",
          });
      
      if (!txn) {
        console.log(`Failed to fetch transaction after ${attempt} attempts`);
        return;
      }

      // process transaction to get relevant information
  
      console.log("preTokenBalances", preTokenBalances);
      console.log("postTokenBalances", postTokenBalances);
      console.log("loaced addresses", innerInstructions);

      const message = `
        🔔 <b>New Transaction Detected!</b>

        👛 <b>Wallet:</b> <a href="${walletUrl + signer}">${formatCryptoAddress(signer)}</a>

        💰 <b>Sol Amount:</b> ${solAmount > 0 ? "📥 SELL" : "📤 BUY"} ${Math.abs(solAmount).(3)} SOL

        💸 <b>PNL for this Token:</b> ${totalPNL.toFixed(3)} SOL

        🚀 <b>Token:</b> <a href="${walletUrl + tokenAddress}">${tokenInfo}</a>

        🔗 <a href="${explorerUrl + signature}">View Transaction</a>

        ⏰ ${new Date().toLocaleString()}
        `;

      await sendTelegramMessage(message); 
    }

  return connection.onLogs(new PublicKey(key), anaylzeSignature, "processed");
}
```

## Conclusion

This Solana wallet tracking bot provides a robust solution for monitoring wallet activities with real-time Telegram notifications. By following this guide and implementing the provided configurations, you can create a powerful tool for tracking Solana transactions and maintaining awareness of your wallet activities.

The system's modular architecture allows for easy maintenance and future enhancements while providing reliable transaction monitoring and notification delivery.

Remember to regularly monitor your API usage and maintain your database to ensure optimal performance of your tracking system.

## License
This project is licensed under the [MIT License](./LICENSE).

## Contact Information

- Gmail: [marksantiago0929@gmail.com](mailto:marksantiago0929@gmail.com)
- GitHub: [MARK](https://github.com/BTC415)
- LinkedIn: [Mark Santiago](https://www.linkedin.com/in/mark-santiago-373172339/)
- Telegram: [@marksantiago02](https://t.me/marksantiago02)
- Twitter: [@MarkSantiago02](https://twitter.com/MarkSantiago02)

