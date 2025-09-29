import pool from '../config/mysql.js';

// Get all games
export const getAllGames = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM games');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get game by ID
export const getGameById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Game not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create game
export const createGame = async (req, res) => {
  const { nom, description, prix, image, id_categorie, id_type_game } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO games (nom, description, prix, image, id_categorie, id_type_game) VALUES (?, ?, ?, ?, ?, ?)',
      [nom, description, prix, image, id_categorie, id_type_game]
    );
    res.status(201).json({ id: result.insertId, nom, description, prix, image, id_categorie, id_type_game });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update game
export const updateGame = async (req, res) => {
  const { id } = req.params;
  const { nom, description, prix, image, id_categorie, id_type_game } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE games SET nom = ?, description = ?, prix = ?, image = ?, id_categorie = ?, id_type_game = ? WHERE id = ?',
      [nom, description, prix, image, id_categorie, id_type_game, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Game not found' });
    res.json({ id, nom, description, prix, image, id_categorie, id_type_game });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete game
export const deleteGame = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM games WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Game not found' });
    res.json({ message: 'Game deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};