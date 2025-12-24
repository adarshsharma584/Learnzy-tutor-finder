import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URI || "http://localhost:5000/api/v1", 
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
