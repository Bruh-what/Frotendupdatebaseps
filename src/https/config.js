import axios from "axios";
// const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = "https://backenddeploymentps-production.up.railway.app";

export const BaseUrl = backendUrl;
export const PROSPONSER = axios.create({ baseURL: BaseUrl });
