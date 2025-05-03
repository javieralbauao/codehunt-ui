import React, { useState } from "react";
import api from "../services/api";
import { useEffect } from "react";
import { getTemplatesByExercise } from "../services/exercisesApi";

const languageMap = {
    python: "74157F44-FEF8-49F8-B897-37E25467E086",
    javascript: "DB4D3CDB-2D84-4409-A7AE-3B64A2EDC0F2",
    csharp: "6647BE14-8071-4AD2-852F-4C5B474706FC",
    cpp: "2027C479-25F5-4F44-8B1F-FB63990A2D53"
};


function ExerciseForm({ onCreated, initialData = null }) {

    const isEditing = Boolean(initialData);
    const exerciseId = initialData?.id;
    const defaultTemplates = {
        python: "",
        javascript: "",
        csharp: "",
        cpp: ""
    };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Fácil");
    const [initialTestData, setInitialTestData] = useState("");
    const [finalTestData, setFinalTestData] = useState("");
    const [templates, setTemplates] = useState(defaultTemplates);
    const [message, setMessage] = useState("");


    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setDescription(initialData.description || "");
            setTopic(initialData.topic || "");
            setDifficulty(initialData.difficulty || "Fácil");
            setInitialTestData(initialData.initialTestData || "");
            setFinalTestData(initialData.finalTestData || "");
        }
    }, [initialData]);


    useEffect(() => {
        const fetchTemplates = async () => {
            if (!initialData?.id) return;

            try {
                const response = await getTemplatesByExercise(initialData.id);
                const templateMap = {};
                response.data.forEach(t => {
                    const lang = Object.keys(languageMap).find(
                        key => languageMap[key].toLowerCase() === t.languageId.toLowerCase()
                    );
                    if (lang) {
                        templateMap[lang] = t.template;
                    }
                });
                setTemplates(prev => ({ ...prev, ...templateMap }));

            } catch (err) {
                console.error("Error cargando plantillas:", err);
            }
        };

        fetchTemplates();
    }, [initialData]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                await api.put(`/exercises/${exerciseId}`, {
                    id: exerciseId,
                    title,
                    description,
                    topic,
                    difficulty,
                    initialTestData,
                    finalTestData,
                    languageId: "74157F44-FEF8-49F8-B897-37E25467E086"
                });

                await Promise.all(Object.entries(templates).map(([lang, template]) =>
                    api.put("/codetemplates", {
                        exerciseId,
                        languageId: languageMap[lang],
                        template
                    })
                ));

                setMessage("✅ Ejercicio actualizado");
                
            } else {
                const res = await api.post("/exercises", {
                    title, description, topic, difficulty,
                    initialTestData, finalTestData,
                    languageId: "74157F44-FEF8-49F8-B897-37E25467E086"
                });
                const newId = res.data.id;

                await Promise.all(Object.entries(templates).map(([lang, template]) =>
                    api.post("/codetemplates", {
                        exerciseId: newId,
                        languageId: languageMap[lang],
                        template
                    })
                ));
                setMessage("✅ Ejercicio creado exitosamente");
            }

            if (onCreated) onCreated();
        } catch (err) {
            console.error(err);
            setMessage("❌ Error al guardar los cambios");
        }
    };


    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontSize: "22px", marginBottom: "20px", fontWeight: "bold" }}>
                {isEditing ? "Editar Ejercicio" : "Crear Nuevo Ejercicio"}
            </h2>
            {message && <p style={{ color: message.includes("✅") ? "green" : "red", marginBottom: "16px" }}>{message}</p>}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" required className="form-input" style={{ padding: "8px" }} />
                <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Tema" required className="form-input" style={{ padding: "8px" }} />
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={{ padding: "8px" }}>
                    <option value="Fácil">Fácil</option>
                    <option value="Media">Media</option>
                    <option value="Difícil">Difícil</option>
                </select>
                <input type="text" value={initialTestData} onChange={(e) => setInitialTestData(e.target.value)} placeholder="Input de ejemplo" required style={{ padding: "8px" }} />
                <input type="text" value={finalTestData} onChange={(e) => setFinalTestData(e.target.value)} placeholder="Output esperado" required style={{ padding: "8px" }} />
            </div>

            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" required style={{ width: "100%", height: "80px", marginBottom: "16px", padding: "8px" }} />

            <h3 style={{ marginTop: "20px", fontSize: "18px", marginBottom: "12px" }}>Plantillas por Lenguaje</h3>

            {Object.keys(templates).map((lang) => {
                console.log(`🌐 [${lang}] =`, templates[lang]);

                return (
                    <div key={lang} style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>{lang}</label>
                        <textarea
                            value={templates[lang] || ""}
                            onChange={(e) => setTemplates({ ...templates, [lang]: e.target.value })}
                            style={{ width: "100%", height: "100px", padding: "8px", fontFamily: "monospace" }}
                        />
                    </div>
                );
            })}

            <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                {isEditing ? "Guardar Cambios" : "Crear Ejercicio"}
            </button>
        </form>
    );
}

export default ExerciseForm;