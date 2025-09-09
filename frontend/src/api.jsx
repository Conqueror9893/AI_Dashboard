import axios from "axios";

const API = axios.create({
  baseURL: "http://10.32.2.151:5000", // Flask backend
});

export const fetchProjects = () => API.get("/projects");
export const startService = (pid, sid) =>
  API.post(`/projects/${pid}/${sid}/start`);
export const stopService = (pid, sid) =>
  API.post(`/projects/${pid}/${sid}/stop`);
export const fetchLogs = (pid, sid) =>
  API.get(`/projects/${pid}/${sid}/logs`);
