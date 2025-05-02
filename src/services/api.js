// src/services/api.js

import axios from "axios";

// Creamos una instancia de axios con la URL base del backend.
// La variable viene del archivo .env (por ejemplo: http://localhost:5297)
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Puedes agregar interceptores aquí si luego necesitas incluir el token JWT
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
