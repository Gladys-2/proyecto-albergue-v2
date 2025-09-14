import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5000/api/users/all");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Bandeja de Usuarios Registrados</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Creado</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

