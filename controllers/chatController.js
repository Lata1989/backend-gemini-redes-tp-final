import { createChat, getChatsByUser, findChatById, deleteChatById } from '../models/chatModel.js';
import { addConversation, getConversationsByChatId } from '../models/conversationModel.js';

export const createChatController = async (req, res) => {
    try {
        const chatId = await createChat(req.user._id);
        res.status(201).json({ success: true, message: "Chat creado con éxito", chatId });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al crear el chat." });
    }
};

export const getAllChatsController = async (req, res) => {
    try {
        const chats = await getChatsByUser(req.user._id);
        res.status(200).json({ success: true, chats });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener los chats." });
    }
};

export const addConversationController = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const conversation = await addConversation(req.params.id, question, answer);
        res.status(201).json({ success: true, conversation });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al agregar la conversación." });
    }
};

export const getConversationController = async (req, res) => {
    try {
        const conversations = await getConversationsByChatId(req.params.id);
        res.status(200).json({ success: true, conversations });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener la conversación." });
    }
};

export const deleteChatController = async (req, res) => {
    try {
        const deleted = await deleteChatById(req.params.id);
        if (deleted) {
            res.status(200).json({ success: true, message: "Chat eliminado con éxito." });
        } else {
            res.status(404).json({ success: false, message: "Chat no encontrado." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al eliminar el chat." });
    }
};
