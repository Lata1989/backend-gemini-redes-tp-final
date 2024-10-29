import { getDb } from "../config/db.js";
import { ObjectId } from "mongodb";

export const addConversation = async (chatId, question, answer) => {
  const db = getDb("ChatBot");
  const result = await db.collection("conversations").insertOne({
    chat: new ObjectId(chatId),
    question,
    answer,
  });
  return result.ops[0];
};

export const getConversationsByChatId = async (chatId) => {
  const db = getDb("ChatBot");
  const conversations = await db.collection("conversations").find({ chat: new ObjectId(chatId) }).toArray();
  return conversations;
};
