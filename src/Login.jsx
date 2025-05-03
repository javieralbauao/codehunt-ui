import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../src/context/userContext";
import api from "../src/services/api";

function Login() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMensaje("❌ Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await api.post("/Auth/login", { email, password });

      const token = response.data.token;
      login(token);

      const decoded = jwtDecode(token);
      const userRole = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      setMensaje("✅ Inicio de sesión exitoso");

      if (userRole === "Student") {
        navigate("/ejercicios");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      setMensaje("❌ Credenciales inválidas o error de conexión");
    }
  };

  return (

    <>

      <div style={{
        backgroundImage: "url('/logo.png')",
        backgroundSize: "cover",
        height: "1000px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        paddingTop: "10%",
        paddingLeft: "40%",
        opacity: "1",
        color: "gray",
        fontSize: "20px"
      }}>
        <h1 className="text-3xl font-bold text-gray-800">
          <span className="text-gray-800">Code</span>Hunt
        </h1>
        <p className="text-sm text-gray-500">Bienvenido, inicia sesión</p>


        <form style={{
          width: "200px",
          backgroundColor: "blue",
          padding: "30px",
          borderRadius: "10px",
          opacity: "0.3",
          color: "gray",
          fontSize: "20px"
        }}
          onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
              placeholder="correo@codehunt.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>

        {mensaje && (
          <p className="text-center text-sm text-red-600 mt-4">{mensaje}</p>
        )}

        <div className="mt-6 border-t pt-4 text-center font-medium text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline font-medium">
            Regístrate
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
