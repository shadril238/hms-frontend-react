import axios from "axios";

export const axiosInstanceUserService = axios.create({
  baseURL: "http://localhost:8091/users",
  timeout: 7000,
});

axiosInstanceUserService.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");

  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

  return config;
});

export default axiosInstanceUserService;
