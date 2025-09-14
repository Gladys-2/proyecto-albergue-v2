import express from "express";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const exist = await Usuario.findOne({ where: { email } });
    if (exist) return res.status(400).json({ message: "El email ya existe" });

    const hashed = await bcrypt.hash(password, 10);
    const nuevo = await Usuario.create({ nombre, email, password: hashed });

    res.json({ success: true, usuario: { id: nuevo.id, nombre: nuevo.nombre, email: nuevo.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(400).json({ message: "Credenciales incorrectas" });

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.status(400).json({ message: "Credenciales incorrectas" });

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// Bandeja de usuarios
router.get("/users", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ attributes: ["id", "nombre", "email"] });
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

export default router;
