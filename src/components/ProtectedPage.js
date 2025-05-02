import React, { useEffect, useState } from "react";
import api from "../services/api";

function ProtectedPage() {
  const [respuesta, setRespuesta] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/auth/test", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRespuesta(res.data))
      .catch(() => setRespuesta("❌ No autorizado"));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Zona Protegida</h2>
      <p>{respuesta}</p>
    </div>
  );
}

export default ProtectedPage;
