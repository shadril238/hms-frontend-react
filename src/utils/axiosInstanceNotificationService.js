import axios from "axios";

export const axiosInstanceNotificationService = axios.create({
  baseURL: "http://localhost:8097/notifications",
  timeout: 7000,
});

axiosInstanceNotificationService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstanceNotificationService;
