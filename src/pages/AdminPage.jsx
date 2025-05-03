import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useUser } from "../context/userContext";
import ExerciseAdmin from "../components/ExerciseAdmin";
import UserAdmin from "../components/UserAdmin";

function AdminPage() {
  const { user } = useUser();

  if (!user || user.role === "student") {
    return <div>Acceso denegado. Esta página es solo para administradores.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Panel de Administración</h1>

      <nav style={{ marginBottom: "20px" }}>
        <Link to="/admin/exercises" style={{ marginRight: "20px" }}>📘 Ejercicios</Link>
        <Link to="/admin/users">👥 Usuarios</Link>
      </nav>

      <Routes>
        <Route path="/exercises" element={<ExerciseAdmin />} />
        <Route path="/users" element={<UserAdmin />} />
      </Routes>
    </div>
  );
}

export default AdminPage;
