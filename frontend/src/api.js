import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (username, password) => {
    try {
      const response = await api.post("/token", new URLSearchParams({ username, password }));
      localStorage.setItem("token", response.data.access_token);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };
  
  export const fetchIoTData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/iot-data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching IoT data:", error);
      return [];
    }
  };
  
