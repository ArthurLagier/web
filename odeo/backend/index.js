import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import gameRoutes from "./routes/gameRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import pool from "./config/mysql.js";
import authRoutes from './routes/authRoutes.js';
import { sendContactEmail } from './controllers/contactController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9090;

app.use(cors({
  origin: "http://localhost:8787",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/", (_req, res) => res.send("Hello world"));
// ... suite du code ...

app.get("/", (_req, res) => res.send("Hello world"));

// Routes
app.use("/games", gameRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.post('/contact', sendContactEmail);

// Démarrage
(async () => {
  try {
    const cx = await pool.getConnection();
    console.log("Connexion MySQL réussie");
    cx.release();
    app.listen(PORT, () =>
      console.log(`API en écoute sur http://localhost:${PORT}`)
    );
  } catch (e) {
    console.error("Connexion MySQL échouée :", e.message);
    process.exit(1);
  }
})();
