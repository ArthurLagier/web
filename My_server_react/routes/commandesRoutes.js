import express from "express";
import pool from "../Config/mysql.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM commandes");
    res.json(rows);
  } catch (error) {
    console.error("Erreur récupération commandes :", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM commandes WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Commande non trouvée" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Erreur récupération commande :", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { id_client, id_paiement, paiement_effectue } = req.body;

    if (!id_client || !id_paiement) {
      return res.status(400).json({ error: "Données incomplètes" });
    }

    const [result] = await pool.query(
      "INSERT INTO commandes (id_client, id_paiement, paiement_effectue) VALUES (?, ?, ?)",
      [id_client, id_paiement, paiement_effectue || false]
    );

    res.json({ message: "Commande créée succès", id: result.insertId });
  } catch (error) {
    console.error("Erreur création commande :", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


router.post("/:id/details", async (req, res) => {
  try {
    const { id } = req.params;
    const { id_plat, quantite, prix_unitaire } = req.body;

    if (!id_plat || !quantite || !prix_unitaire) {
      return res.status(400).json({ error: "Données incomplètes" });
    }

    const [result] = await pool.query(
      "INSERT INTO details_commande (id_commande, id_plat, quantite, prix_unitaire) VALUES (?, ?, ?, ?)",
      [id, id_plat, quantite, prix_unitaire]
    );

    res.json({ message: "Plat ajouté à la commande", id: result.insertId });
  } catch (error) {
    console.error("Erreur ajout plat commande :", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const [result] = await pool.query("DELETE FROM commandes WHERE id = ?", [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Commande non trouvée" });
      }
  
      res.json({ message: "Commande supprimée succès" });
    } catch (error) {
      console.error("Erreur suppression commande :", error.message);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

export default router;