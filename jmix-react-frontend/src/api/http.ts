import axios from "axios";
import { getAccessToken } from "@/services/auth";
import { HttpError } from "./HttpError";

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor: Thêm Authorization header
http.interceptors.request.use(
    async (config) => {
        try {
            const token = await getAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            // Token không có sẵn, tiếp tục request không có auth header
            console.warn("[HTTP] Failed to get access token:", error);
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: Chuyển đổi errors thành HttpError
http.interceptors.response.use(
    (response) => response,
    (error) => {
        // Network error hoặc timeout (không có response)
        if (!error.response) {
            const isTimeout = error.code === "ECONNABORTED";
            throw new HttpError(error.config, 0, {
                error: isTimeout ? "TIMEOUT" : "NETWORK_ERROR",
                details: isTimeout
                    ? "Yêu cầu đã hết thời gian chờ"
                    : "Không thể kết nối tới máy chủ",
            });
        }

        const { status, data, config } = error.response;

        if (data?.error) {
            throw new HttpError(config, status, {
                error: data.error,
                details: data.details || data.error_description,
            });
        }

        if (data?.error_description) {
            throw new HttpError(config, status, {
                error: data.error || "OAUTH_ERROR",
                details: data.error_description,
            });
        }

        throw new HttpError(config, status, {
            error: `HTTP_${status}`,
            details: typeof data === "string" ? data : JSON.stringify(data),
        });
    }
);
