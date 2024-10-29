import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'; // Importamos dotenv

dotenv.config(); // Cargamos las variables de entorno

const client = new MongoClient(process.env.MONGODB_URI);

let db;

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db('ChatBot');
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

export const getDb = () => db;
