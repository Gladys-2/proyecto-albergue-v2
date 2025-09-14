import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
      alert(`Bienvenido ${res.data.name}`);
      onLogin(); // recargar la bandeja
    } catch (error) {
      alert(error.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
}
