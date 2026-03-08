import axios from "axios";

// Create Axios Instance
const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Configure Interceptor to append tokens globally to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
