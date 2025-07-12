import axios from "axios";

// Set your API base URL in .env as VITE_API_URL, e.g. http://localhost:5000/api
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

console.log("API_URL:", API_URL);

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Making request to:", config.url);
    console.log("Token present:", !!token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default API;
