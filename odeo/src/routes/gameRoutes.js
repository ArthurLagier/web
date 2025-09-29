import express from "express";
import pool from "../Config/mysql.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM games");
    res.json(rows);
  } catch (error) {
    console.error("Erreur récupération games :", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM games WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "game non trouvé" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Erreur récupération game :", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { nom, description, prix, image, id_categorie, id_type_game } = req.body;

    if (!nom || !prix || !id_categorie || !id_type_game) {
      return res.status(400).json({ error: "Données incomplètes" });
    }

    const [result] = await pool.query(
      "INSERT INTO games (nom, description, prix, image, id_categorie, id_type_game) VALUES (?, ?, ?, ?, ?, ?)",
      [nom, description, prix, image, id_categorie, id_type_game]
    );

    res.json({ message: "game ajouté succès", id: result.insertId });
  } catch (error) {
    console.error("Erreur ajout game :", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const [result] = await pool.query("DELETE FROM games WHERE id = ?", [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "game non trouvé" });
      }
  
      res.json({ message: "game supprimé succès" });
    } catch (error) {
      console.error("Erreur suppression game :", error.message);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

export default router;