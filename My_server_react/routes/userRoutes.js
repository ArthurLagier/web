/*import express from 'express';
import mysql from '../Config/mysql';


const router =express.Router();

router.get('/users', async(req, res)=>{

    try{
        const connection = await mysql.getConnection();
        const [row] = await connection.execute('SELECT * FROM users');
        connection.release();
        res.json(rows);}
        catch (err) {

            res.status(500).json({error: err.message});
        }
});

router.post('/user',async(req, res) =>{
    const {name, email, age} =req.body;
    try {
        const connection= await mysql.getConnection();
        const [result] = await connection.execute ('INSERT INTO users (name, email, age) VALUES (?,?,?)', [name, email, age]);
        connection.release();
        res.status(201).json({ id: result.insertId, name, email, age});
    }
catch(err){
    res.status(500).json({ error: err.message})
}
})

router.delete('/user/id', async(req, res) => {
    const {id} = req.params;
    try {
        const connection = await mysql.getConnection();
        await connection.execute('DELETE FROM users WHERE id =?', [id]);
        connection.release();
        res.json({message: 'User deleted successfully'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;*/
import express from "express";
import pool from "../Config/mysql.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, nom, email, role FROM users");
    res.json(rows);
  } catch (error) {
    console.error("Erreur récupération utilisateurs :", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT id, nom, email, role FROM users WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Erreur récupération utilisateur :", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { nom, email, password, role } = req.body;

    if (!nom || !email || !password) {
      return res.status(400).json({ error: "Données incomplètes" });
    }

    const [result] = await pool.query(
      "INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)",
      [nom, email, password, role || "client"]
    );

    res.json({ message: "Utilisateur créé succès", id: result.insertId });
  } catch (error) {
    console.error("Erreur ajout utilisateur :", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
  
      res.json({ message: "Utilisateur supprimé succès" });
    } catch (error) {
      console.error("Erreur suppression utilisateur :", error.message);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

export default router;