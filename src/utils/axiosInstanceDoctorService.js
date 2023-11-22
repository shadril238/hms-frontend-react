import axios from "axios";

export const axiosInstanceDoctorService = axios.create({
  baseURL: "http://localhost:8093/doctors",
  timeout: 7000,
});

axiosInstanceDoctorService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstanceDoctorService;
