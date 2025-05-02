import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Exercises from "./Exercises";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ejercicios" element={<Exercises />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
