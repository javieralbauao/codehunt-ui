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
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <h1 className="text-5xl font-extrabold text-center text-indigo-800 mb-16 animate-pulse drop-shadow-lg">
          ✨ ¡A Programar se Ha Dicho! ✨
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Ejercicio 1 */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300">
            <div className="p-10">
              <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center justify-center sm:justify-start">
                <span className="mr-4 text-purple-500 text-xl font-semibold">1.</span> Suma de dos números
              </h2>
              <p className="text-lg text-gray-800 mb-6 text-center sm:text-left">
                ¡Comencemos con algo sencillo! Escribe tu código Python aquí para sumar esos dos numeritos. 👇
              </p>
              <textarea
                className="w-full h-40 p-4 bg-indigo-50 rounded-md text-sm text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={userCode1}
                onChange={handleCodeChange1}
              />
              <div className="flex justify-center sm:justify-start mt-6">
                <button
                  className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-300 active:bg-purple-900 transition duration-200"
                  onClick={() => runCode(userCode1, 1)}
                >
                  ¡A Sumar! ➕
                </button>
                {result1 && (
                  <div className="ml-4 text-green-600 font-semibold text-lg flex items-center">
                    ✅ {result1}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-purple-100 py-4 px-10 text-sm text-purple-700 text-center sm:text-left">
              💡 <span className="font-bold">Consejo rápido:</span> El operador `+` es tu mejor amigo aquí.
            </div>
          </div>

          {/* Ejercicio 2 */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300">
            <div className="p-10">
              <h2 className="text-2xl font-bold text-pink-700 mb-6 flex items-center justify-center sm:justify-start">
                <span className="mr-4 text-pink-500 text-xl font-semibold">2.</span> ¿Es un número par? 🤔
              </h2>
              <p className="text-lg text-gray-800 mb-6 text-center sm:text-left">
                ¡Un pequeño desafío más! Determina si el número que te den es par o impar con tu magia Python. ✨
              </p>
              <textarea
                className="w-full h-40 p-4 bg-pink-50 rounded-md text-sm text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={userCode2}
                onChange={handleCodeChange2}
              />
              <div className="flex justify-center sm:justify-start mt-6">
                <button
                  className="bg-pink-600 hover:bg-pink-800 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-4 focus:ring-pink-300 active:bg-pink-900 transition duration-200"
                  onClick={() => runCode(userCode2, 2)}
                >
                  ¡A Comprobar! 🔍
                </button>
                {result2 && (
                  <div className="ml-4 text-green-600 font-semibold text-lg flex items-center">
                    ✅ {result2}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-pink-100 py-4 px-10 text-sm text-pink-700 text-center sm:text-left">
              💡 <span className="font-bold">Recuerda:</span> El operador `%` te dirá el resto de una división. 😉
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exercises;