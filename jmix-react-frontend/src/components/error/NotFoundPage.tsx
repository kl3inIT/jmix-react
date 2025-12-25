import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="flex align-items-center justify-content-center min-h-screen surface-ground">
            <Card className="text-center w-full md:w-30rem shadow-3">
                <i className="pi pi-exclamation-triangle text-7xl text-orange-500 mb-4 block" />
                <h1 className="text-6xl font-bold text-900 mb-2 mt-0">404</h1>
                <p className="text-xl text-600 mb-2">Trang không tồn tại</p>
                <p className="text-500 mb-5 line-height-3">
                    Xin lỗi, trang bạn đang tìm kiếm không được tìm thấy hoặc đã bị di chuyển.
                </p>
                <Button
                    label="Về trang chủ"
                    icon="pi pi-home"
                    onClick={() => navigate("/")}
                    size="large"
                />
            </Card>
        </div>
    );
}

