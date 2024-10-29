import express from 'express';
import { loginUserController, myProfileController, verifyUserController } from '../controllers/userController.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

// Rutas para el manejo de usuarios
router.post('/login', loginUserController);            // Iniciar sesión (envía OTP)
router.post('/verify', verifyUserController);          // Verificar OTP y generar JWT
router.get('/me', isAuth, myProfileController);        // Obtener el perfil del usuario autenticado

export default router;
