import axios from "axios";

export const axiosInstanceInventoryService = axios.create({
  baseURL: "http://localhost:8096/pharmaceutical-inventory",
  timeout: 7000,
});

axiosInstanceInventoryService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstanceInventoryService;
