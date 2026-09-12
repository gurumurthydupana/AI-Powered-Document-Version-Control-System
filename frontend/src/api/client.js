import axios from "axios";

const API_URL = "https://doc-version-control-backend.onrender.com";

const client = axios.create({
  baseURL: API_URL,
  timeout: 60000,
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
      error.message =
        "Request timed out. The API may still be waking up — try again in a few seconds.";
    } else if (!error.response) {
      error.message = `Cannot reach the API at ${API_URL}.`;
    }
    return Promise.reject(error);
  }
);

export default client;
