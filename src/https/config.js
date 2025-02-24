import axios from "axios";
// const backendUrl = import.meta.env.NEXT_PUBLIC_BACKEND_URL;
// console.log(backendUrl);

const backendUrl = "https://backenddeploymentps-production.up.railway.app";

export const BaseUrl = backendUrl;
export const PROSPONSER = axios.create({ baseURL: BaseUrl });
