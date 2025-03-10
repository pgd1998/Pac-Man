import axios from "axios";

// Create a configurable base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || ""; 

// Configure axios instance with production-ready settings
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  }
});

// Add a request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for common error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle session expiration (401 errors)
    if (error.response && error.response.status === 401) {
      // Clear local authentication
      localStorage.removeItem("userToken");
      // Redirect to login if needed
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;