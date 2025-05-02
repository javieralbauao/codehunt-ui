import React, { useState } from "react";

function Exercises() {
  const [userCode1, setUserCode1] = useState(`def suma(a, b):\n    return a + b`);
  const [userCode2, setUserCode2] = useState(`def es_par(n):\n    return n % 2 == 0`);
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");

  const handleCodeChange1 = (event) => {
    setUserCode1(event.target.value);
  };

  const handleCodeChange2 = (event) => {
    setUserCode2(event.target.value);
  };

  const runCode = (code, exerciseNumber) => {
    // **Simulación de ejecución de código (aquí iría tu lógica real)**
    console.log(`Ejecutando código para el Ejercicio ${exerciseNumber}:`, code);
    const simulatedResult = `¡Resultado simulado para el Ejercicio ${exerciseNumber}! 🎉`;
    if (exerciseNumber === 1) {
      setResult1(simulatedResult);
    } else if (exerciseNumber === 2) {
      setResult2(simulatedResult);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-pink-300 py-16">
    Ejercicios
    </div>
  );
}

export default Exercises;