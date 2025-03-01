import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

// // Add this handler to get chat ID
// bot.on("message", (msg) => {
//   console.log("New chat ID:", msg.chat.id);

//   TELEGRAM_CHAT_ID = msg.chat.id.toString();
// });

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
