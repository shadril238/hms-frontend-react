import axios from "axios";

export const axiosInstanceCommunityPortalService = axios.create({
  baseURL: "http://localhost:8094/community-portal",
  timeout: 7000,
});

axiosInstanceCommunityPortalService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstanceCommunityPortalService;
