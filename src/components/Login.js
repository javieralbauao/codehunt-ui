import React, { useState } from "react";
import api from "../services/api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { username, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      onLogin(token);
      setMensaje("✅ Login exitoso");
    } catch (err) {
      setMensaje("❌ Credenciales inválidas");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />
        <input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Entrar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Login;
