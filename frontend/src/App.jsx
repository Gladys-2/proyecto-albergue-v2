
import { useState } from "react";
import Register from "./components/Register.jsx";
import Login from "./components/login.jsx";
import Users from "./components/Users.jsx";

export default function App() {
  const [view, setView] = useState("login"); // "login" | "register" | "users"

  return (
    <div>
      {view === "login" && <Login onLogin={() => setView("users")} />}
      {view === "register" && <Register onRegister={() => setView("users")} />}
      {view === "users" && <Users />}
      <button onClick={() => setView("login")}>Login</button>
      <button onClick={() => setView("register")}>Registrar</button>
    </div>
  );
}
