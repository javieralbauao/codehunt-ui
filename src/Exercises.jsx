import React, { useState, useEffect } from "react";
import * as exercisesApi from "../src/services/exercisesApi";
import { useUser } from "../src/context/userContext";

const languageIds = {
  csharp: "6647BE14-8071-4AD2-852F-4C5B474706FC", 
  javascript: "DB4D3CDB-2D84-4409-A7AE-3B64A2EDC0F2",
  python: "74157F44-FEF8-49F8-B897-37E25467E086",
  cpp: "2027C479-25F5-4F44-8B1F-FB63990A2D53"    
};

const getLanguageId = (lang) => languageIds[lang];

function ExercisePage() {
  const { user, logout } = useUser();
  const [exercisesList, setExercisesList] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [language, setLanguage] = useState("python");
  const [userCode, setUserCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  
  useEffect(() => {
    if (userOutput && expectedOutput) {
      const isCorrect = userOutput.trim() === expectedOutput.trim();
      if (isCorrect) {
        setCompletedCount((prev) => prev + 1);
      }
      setProgress(((completedCount + (isCorrect ? 1 : 0)) / exercisesList.length) * 100);
    }
  }, [userOutput, expectedOutput, completedCount, exercisesList.length]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await exercisesApi.getAllExercises();
        setExercisesList(response.data);
        if (response.data.length > 0) {
          setSelectedExercise(response.data[0]);
          const templateResp = await exercisesApi.getTemplate(response.data[0].id, getLanguageId(language));
          setUserCode(templateResp.data.template);
        }
      } catch (error) {
        console.error("Error al cargar ejercicios:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchExercises();
    }
  }, [user, language]);

  const handleExerciseChange = async (exercise) => {
    setSelectedExercise(exercise);
    try {
      const templateResp = await exercisesApi.getTemplate(exercise.id, getLanguageId(language));
      setUserCode(templateResp.data.template);
    } catch {
      setUserCode("// No se pudo cargar la plantilla.");
    }
    setResult("");
    setUserOutput("");
    setExpectedOutput("");
  };

  const handleLanguageChange = async (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    if (selectedExercise) {
      try {
        const templateResp = await exercisesApi.getTemplate(selectedExercise.id, getLanguageId(newLang));
        setUserCode(templateResp.data.template);
      } catch {
        setUserCode("// No se pudo cargar la plantilla.");
      }
    }
  };

  const handleRun = async () => {
    setSaving(true);
    setResult("");
    setUserOutput("");
    setExpectedOutput("");
    try {
      const response = await exercisesApi.runCode({
        exerciseId: selectedExercise.id,
        language,
        code: userCode
      });
      setUserOutput(response.data.userOutput);
      setExpectedOutput(response.data.expectedOutput);
      setResult(response.data.correct
        ? "✅ ¡Correcto! Todos los casos de prueba pasaron."
        : `❌ Incorrecto. ${response.data.error || "La salida no coincide con la esperada."}`);
    } catch (error) {
      setResult("Error al ejecutar el código: " + (error.response?.data?.message || error.message));
      if (error.response?.status === 401) logout();
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await exercisesApi.submitSolution({
        exerciseId: selectedExercise.id,
        language,
        code: userCode
      });
      setResult("¡Código guardado exitosamente! 🎉");
    } catch (error) {
      setResult("Error al guardar el código: " + (error.response?.data?.message || error.message));
      if (error.response?.status === 401) logout();
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>Por favor inicia sesión para continuar</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>Hola, {user.name}</div>
        <button onClick={logout} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cerrar Sesión</button>
      </div>

      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Ejercicios de Programación</h1>

      <div style={{ display: 'grid', gap: '20px', marginBottom: '20px' }}>
        {exercisesList.map(exercise => (
          <div key={exercise.id} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', backgroundColor: selectedExercise?.id === exercise.id ? '#f0f0ff' : 'white' }} onClick={() => handleExerciseChange(exercise)}>
            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>{exercise.title}</h2>
            <p style={{ color: '#666' }}>{exercise.description}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", marginBottom: "10px" }}>
  <div style={{ padding: "8px 16px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
    <strong>✅ Completados:</strong> {completedCount}/{exercisesList.length}
  </div>
  <div style={{ padding: "8px 16px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
    <strong>📊 Progreso:</strong> {Math.round(progress)}%
  </div>
</div>
      {selectedExercise && (
        <>
          <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            <h3 style={{ marginBottom: '10px' }}>Ejemplo:</h3>
            <pre style={{ fontFamily: 'monospace' }}>{selectedExercise.InitialTestData}</pre>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Lenguaje:</label>
            <select value={language} onChange={handleLanguageChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="csharp">C#</option>
              <option value="javascript">C++</option>
              <option value="python">python</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Tu código:</label>
            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ width: '100%', height: '300px', padding: '15px', fontFamily: 'monospace', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }} spellCheck="false" />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button onClick={handleRun} disabled={saving} style={{ padding: '10px 20px', backgroundColor: saving ? '#999' : '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: saving ? 'not-allowed' : 'pointer' }}>{saving ? 'Ejecutando...' : 'Ejecutar código'}</button>
            <button onClick={handleSubmit} disabled={saving} style={{ padding: '10px 20px', backgroundColor: saving ? '#999' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: saving ? 'not-allowed' : 'pointer' }}>{saving ? 'Guardando...' : 'Guardar solución'}</button>
          </div>

          {(result || userOutput || expectedOutput) && (
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: result.includes('✅') ? '#e6ffe6' : '#fff6f6', borderRadius: '4px', border: '1px solid ' + (result.includes('✅') ? '#c3e6cb' : '#f5c6cb') }}>
              <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>{result}</div>
              {userOutput && <div><strong>Tu salida:</strong><pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>{userOutput}</pre></div>}
              {expectedOutput && <div><strong>Salida esperada:</strong><pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>{expectedOutput}</pre></div>}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ExercisePage;