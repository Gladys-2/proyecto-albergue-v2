import express from "express";
import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: "Error al registrar usuario", details: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (user.rows.length === 0) return res.status(400).json({ error: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) return res.status(400).json({ error: "Contraseña incorrecta" });

    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión", details: error.message });
  }
});

// Bandeja de usuarios
router.get("/all", async (req, res) => {
  try {
    const users = await pool.query("SELECT id, name, email, created_at FROM users ORDER BY id ASC");
    res.json(users.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios", details: error.message });
  }
});

export default router;
