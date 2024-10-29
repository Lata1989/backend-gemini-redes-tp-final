import { getDb } from '../config/db.js';
import { ObjectId } from 'mongodb';

export const usuario = {
    email: '',
    nombre: '',
    rol: '',  // Ejemplo: admin, user
};

// Crear un usuario
export const createUser = async (email, nombre = '', rol = 'user') => {
    const db = getDb("ChatBot");
    const newUser = { ...usuario, email, nombre, rol };
    const result = await db.collection('users').insertOne(newUser);
    return result.insertedId;
};

// Buscar usuario por email
export const findUserByEmail = async (email) => {
    const db = getDb("ChatBot");
    const user = await db.collection('users').findOne({ email });
    return user;
};

// Buscar usuario por ID
export const findUserById = async (id) => {
    const db = getDb("ChatBot");
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    return user;
};
