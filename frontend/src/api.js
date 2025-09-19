// src/api.js
import axios from "axios";

// ✅ Create Axios instance with base backend URL
const API = axios.create({
  baseURL: "http://localhost:3001/api", // change if deployed
});

// ✅ Interceptor to attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: Response interceptor for global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can add global error handling logic here
    // e.g., redirect to signin if 401 unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default API;
