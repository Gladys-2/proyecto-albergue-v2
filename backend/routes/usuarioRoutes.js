import express from "express";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";

const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    // Verificar si el usuario ya existe
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ message: "Usuario ya existe" });

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword
    });

    res.status(201).json(nuevoUsuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

export default router;
