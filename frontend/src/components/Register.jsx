import { useState } from "react";
import axios from "axios";

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name, email, password
      });
      alert("Usuario registrado con éxito");
      onRegister(); // recargar la bandeja
    } catch (error) {
      alert(error.response?.data?.error || "Error al registrar");
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <input placeholder="Nombre" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
}

