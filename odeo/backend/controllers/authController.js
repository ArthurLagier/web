import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/mysql.js';
import { isPasswordStrong } from '../utils/validation.js'; // 👈 Importer la fonction

const signToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || '7d',
  });

export const register = async (req, res) => {
  const { nom, email, password } = req.body;
  if (!isPasswordStrong(password)) {
    return res.status(400).json({
      error: 'Le mot de passe ne respecte pas les conditions de sécurité. (min 12 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial)',
    });
  }
  try {
    const [exist] = await pool.query('SELECT id FROM users WHERE email=?', [email]);
    if (exist.length) return res.status(409).json({ error: 'Email déjà pris' });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)',
      [nom, email, hash, 'client']
    );

    const user = { id: result.insertId, nom, email, role: 'client' };
    const token = signToken(user);
    res.status(201).json({ user, token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email=?', [email]);
    if (!rows.length) return res.status(401).json({ error: 'Identifiants invalides' });
    const user = rows[0];

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Identifiants invalides' });

    delete user.password;
    const token = signToken(user);
    res.json({ user, token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const me = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nom, email, role FROM users WHERE id=?', [req.user.id]);
    if (!rows.length) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  
};

export async function deleteMe(req, res) {
  try {
    const userId = req.user.id;            // middleware auth 
    await pool.query('DELETE FROM users WHERE id = ?', [userId]);
    return res.status(204).send();         
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Suppression impossible' });
  }
}

