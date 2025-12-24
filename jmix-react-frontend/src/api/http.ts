import axios from "axios";
import { getAccessToken } from "@/services/auth";
import { HttpError } from "./HttpError.ts";

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

http.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            throw new Error("Network error");
        }

        const { status, data, config } = error.response;

        if (data?.error) {
            throw new HttpError(config, status, data);
        }
        if (data?.error_description) {
            throw new HttpError(config, status, {
                error: data.error,
                details: data.error_description,
            });
        }

        throw new HttpError(config, status, {
            error: "Unknown error",
            details: JSON.stringify(data),
        });
    }
);


