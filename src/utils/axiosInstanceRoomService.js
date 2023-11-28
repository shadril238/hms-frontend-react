import axios from "axios";

export const axiosInstanceRoomService = axios.create({
  baseURL: "http://localhost:8093/rooms",
  timeout: 7000,
});

axiosInstanceRoomService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstanceRoomService;
