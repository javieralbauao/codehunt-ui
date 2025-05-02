import React, { useEffect, useState } from "react";
import api from "../services/api";

const StatusCheck = () => {
  const [mensaje, setMensaje] = useState("Cargando...");

  useEffect(() => {
    api
      .get("/user")
      .then((res) => {
        setMensaje(res.data); // <-- Aquí llega: "API funcionando correctamente"
      })
      .catch((err) => {
        console.error(err);
        setMensaje("❌ Error al conectar con la API");
      });
  }, []);

  return (
    <div style={{ padding: "2rem", fontSize: "1.2rem" }}>
      <h2>Prueba de conexión con el backend</h2>
      <p>{mensaje}</p>
    </div>
  );
};

export default StatusCheck;
