import axios from "axios";

export const axiosInstancePatientService = axios.create({
  baseURL: "http://localhost:8092/patients",
  timeout: 1000,
});

axiosInstancePatientService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstancePatientService;
