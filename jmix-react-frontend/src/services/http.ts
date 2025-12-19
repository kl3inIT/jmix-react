import axios from "axios";

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

http.interceptors.request.use(function (config) {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    },
);

http.interceptors.response.use(
    function onFulfilled(response) {
        return response.data;
    },

    function onRejected(error) {
        if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");

            if (globalThis.location.pathname !== "/login") {
                globalThis.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);
