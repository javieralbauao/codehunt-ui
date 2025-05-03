import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Exercises from "./Exercises";
import Dashboard from "./Dashboard";
import AdminPage from "./pages/AdminPage";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/ejercicios"
          element={
            <PrivateRoute>
              <Exercises />
            </PrivateRoute>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
