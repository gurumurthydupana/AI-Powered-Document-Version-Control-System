import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const client = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      error.message = "Request timed out. Is the backend running on port 5000?";
    } else if (!error.response) {
      error.message =
        "Cannot reach the API. Start the backend with npm run dev in the backend folder (http://localhost:5000).";
    }
    return Promise.reject(error);
  }
);

export default client;
