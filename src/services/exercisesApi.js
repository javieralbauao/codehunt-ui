import api from "./api";

export const getAllExercises = () => api.get("/exercises");
export const getTemplate = (exerciseId, languageId) => api.get(`/templates/${exerciseId}/template/${languageId}`);
export const runCode = (data) => api.post("/exercises/run", data); 
export const submitSolution = (data) => api.post("/exercises/submit", data);
