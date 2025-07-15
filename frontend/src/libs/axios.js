import axios from "axios";
// This file is used to create an axios instance with a base URL
// based on the environment (development or production).
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";
const api = axios.create({
    baseURL: BASE_URL,
});

export default api;