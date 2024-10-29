import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Importar rutas
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";

// Usar rutas
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/gemini", geminiRoutes);

// Ruta para comprobar si el backend funciona correctamente
app.get('/', (req, res) => {
    res.send("Bienvenido a la API");
});

// Conectar a la base de datos y levantar el servidor
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server funcionando en el puerto ${port}.`);
    });
}).catch(err => {
    console.error("No se conecto a MongoDB:", err);
});
