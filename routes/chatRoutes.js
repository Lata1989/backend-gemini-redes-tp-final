import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import {
    createChatController,
    getAllChatsController,
    addConversationController,
    getConversationController,
    deleteChatController,
} from '../controllers/chatController.js';

const router = express.Router();

// Rutas para el CRUD de chats
router.post('/new', isAuth, createChatController);          // Crear un nuevo chat
router.get('/all', isAuth, getAllChatsController);          // Obtener todos los chats
router.post('/:id', isAuth, addConversationController);     // Agregar una conversación a un chat
router.get('/:id', isAuth, getConversationController);      // Obtener conversaciones de un chat
router.delete('/:id', isAuth, deleteChatController);        // Borrar un chat

export default router;
