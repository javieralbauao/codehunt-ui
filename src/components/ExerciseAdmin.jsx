import React, { useEffect, useState } from "react";
import api from "../services/api";
import ExerciseForm from "./ExerciseForm";
import { deleteExercise } from "../services/exercisesApi";

function ExerciseAdmin() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchExercises = async () => {
    try {
      const response = await api.get("/exercises");
      setExercises(response.data);
    } catch (err) {
      console.error("Error al obtener ejercicios", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este ejercicio?")) return;

    try {
      await deleteExercise(id);
      await fetchExercises();
    } catch (err) {
      console.error("Error eliminando ejercicio", err);
      alert("❌ No se pudo eliminar el ejercicio.");
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Gestión de Ejercicios</h2>

      {!showForm && (
        <button
          onClick={() => {
            setEditData(null);
            setShowForm(true);
          }}
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          ➕ Nuevo Ejercicio
        </button>
      )}

      {showForm && (
        <ExerciseForm
          initialData={editData}
          onCreated={() => {
            fetchExercises();
            setEditData(null);
            setShowForm(false);
          }}
        />
      )}

      <h3 style={{ marginTop: "30px" }}>Lista de Ejercicios</h3>

      {loading ? (
        <p>Cargando ejercicios...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ background: "#eee", textAlign: "left" }}>
              <th>Título</th>
              <th>Temática</th>
              <th>Dificultad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((e) => (
              <tr key={e.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td>{e.title}</td>
                <td>{e.topic}</td>
                <td>{e.difficulty}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditData(e);
                      setShowForm(true);
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    style={{ color: "red" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExerciseAdmin;
