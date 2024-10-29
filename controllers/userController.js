import { createUser, findUserByEmail, findUserById } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import sendMail from '../middlewares/sendMail.js';

export const loginUserController = async (req, res) => {
    try {
        const { email } = req.body;
        let user = await findUserByEmail(email);

        // Si el usuario no existe, lo crea
        if (!user) {
            const newUserId = await createUser(email);
            user = await findUserById(newUserId);
        }

        const otp = Math.floor(Math.random() * 1000000); // OTP aleatorio
        const verifyToken = jwt.sign({ user, otp }, process.env.ACTIVATION_SECRET, { expiresIn: '7d' });

        await sendMail(email, 'ChatBot', otp);  // Envía el OTP por correo

        res.json({ message: 'OTP enviado.', verifyToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyUserController = async (req, res) => {
    try {
        const { otp, verifyToken } = req.body;
        const verified = jwt.verify(verifyToken, process.env.ACTIVATION_SECRET);

        if (!verified) {
            return res.status(400).json({ message: 'OTP vencido.' });
        }

        if (verified.otp !== otp) {
            return res.status(400).json({ message: 'OTP incorrecto.' });
        }

        const token = jwt.sign({ _id: verified.user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

        res.json({ message: 'Login exitoso', user: verified.user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const myProfileController = async (req, res) => {
    try {
        const user = await findUserById(req.user._id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil del usuario.' });
    }
};
