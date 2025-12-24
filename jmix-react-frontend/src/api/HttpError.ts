import type {AxiosRequestConfig} from "axios";

export interface JmixErrorPayload {
    error: string;
    details?: string;
}

export class HttpError extends Error {
    public readonly request?: AxiosRequestConfig;
    public readonly status: number;
    public readonly details?: string;

    constructor(
        request: AxiosRequestConfig | undefined,
        status: number,
        payload: JmixErrorPayload
    ) {
        super(payload.details || payload.error || `HTTP ${status}`);
        this.name = "HttpError";
        this.request = request;
        this.status = status;
        this.details = payload.details;
    }

    isHard() {
        return this.status === 401 || this.status >= 500;
    }

    userMessage() {
        switch (this.status) {
            case 401:
                return "Phiên đăng nhập đã hết hạn";
            case 403:
                return "Bạn không có quyền truy cập";
            case 404:
                return "Không tìm thấy dữ liệu";
            case 0:
                return "Không thể kết nối tới máy chủ";
            default:
                return "Đã xảy ra lỗi, vui lòng thử lại";
        }
    }
}
