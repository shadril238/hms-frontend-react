import axios from "axios";

export const axiosInstanceAppointmentService = axios.create({
  baseURL: "http://localhost:8093/appointments",
  timeout: 7000,
});

axiosInstanceAppointmentService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstanceAppointmentService;
