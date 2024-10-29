import { getDb } from '../config/db.js';
import { ObjectId } from 'mongodb';

export const chat = {
    user: '',
    latestMessage: '',
};

// Crear un chat
export const createChat = async (userId) => {
    const db = getDb("ChatBot");
    const newChat = { ...chat, user: new ObjectId(userId), latestMessage: "Nuevo chat" };
    const result = await db.collection('chats').insertOne(newChat);
    return result.insertedId;
};

// Obtener todos los chats por usuario
export const getChatsByUser = async (userId) => {
    const db = getDb("ChatBot");
    const chats = await db.collection('chats').find({ user: new ObjectId(userId) }).sort({ createdAt: -1 }).toArray();
    return chats;
};

// Obtener un chat por ID
export const findChatById = async (chatId) => {
    const db = getDb("ChatBot");
    const chat = await db.collection('chats').findOne({ _id: new ObjectId(chatId) });
    return chat;
};

// Borrar un chat por ID
export const deleteChatById = async (chatId) => {
    const db = getDb("ChatBot");
    const result = await db.collection('chats').deleteOne({ _id: new ObjectId(chatId) });
    return result.deletedCount;
};
