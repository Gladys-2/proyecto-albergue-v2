import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import "./config/db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`));
