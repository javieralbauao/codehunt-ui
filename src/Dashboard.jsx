import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../src/context/userContext"; 

function Dashboard() {
  const { user } = useUser();

  if (!user) return <div>Por favor inicia sesión</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido, {user.name}</h1>
      <ul>
        {user.role !== "student" && <li><Link to="/admin">Panel de Administración</Link></li>}
        <li><Link to="/ejercicios">Ir a Ejercicios</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;
