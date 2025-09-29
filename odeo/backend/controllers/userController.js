import pool from '../config/mysql.js';
import bcrypt from 'bcrypt';

const PUBLIC_FIELDS = 'id, nom, email, role';


export const getAllUsers = async (_req, res) => {
  try {
    const [rows] = await pool.query(`SELECT ${PUBLIC_FIELDS} FROM users`);
    res.json(rows);
    console.log("rows",rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT ${PUBLIC_FIELDS} FROM users WHERE id = ?`,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createUser = async (req, res) => {
  try {
    const { nom, email, password, role = 'client' } = req.body;
    if (!nom || !email || !password) {
      return res.status(400).json({ error: 'nom, email et password sont requis' });
    }

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)',
      [nom, email, hash, role]
    );

    res.status(201).json({ id: result.insertId, nom, email, role });
  } catch (err) {

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email déjà utilisé' });
    }
    res.status(500).json({ error: err.message });
  }
};


export const updateUser = async (req, res) => {
  const { id } = req.params;
  let { nom, email, password, role } = req.body;

  try {

    const fields = [];
    const values = [];

    if (nom !== undefined) { fields.push('nom = ?'); values.push(nom); }
    if (email !== undefined) { fields.push('email = ?'); values.push(email); }
    if (password !== undefined) {
      const hash = await bcrypt.hash(password, 10);
      fields.push('password = ?'); values.push(hash);
    }
    if (role !== undefined) { fields.push('role = ?'); values.push(role); }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'Aucun champ à mettre à jour' });
    }

    values.push(id);
    const [result] = await pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }


    const [rows] = await pool.query(`SELECT ${PUBLIC_FIELDS} FROM users WHERE id = ?`, [id]);
    res.json(rows[0]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email déjà utilisé' });
    }
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};