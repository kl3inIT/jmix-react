import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export function ForbiddenPage() {
    const navigate = useNavigate();

    return (
        <div className="flex align-items-center justify-content-center min-h-screen surface-ground">
            <Card className="text-center w-full md:w-30rem shadow-3">
                <i className="pi pi-lock text-7xl text-red-500 mb-4 block" />
                <h1 className="text-6xl font-bold text-900 mb-2 mt-0">403</h1>
                <p className="text-xl text-600 mb-2">Truy cập bị từ chối</p>
                <p className="text-500 mb-5 line-height-3">
                    Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
                </p>
                <div className="flex gap-2 justify-content-center">
                    <Button
                        label="Quay lại"
                        icon="pi pi-arrow-left"
                        severity="secondary"
                        onClick={() => navigate(-1)}
                    />
                    <Button
                        label="Về trang chủ"
                        icon="pi pi-home"
                        onClick={() => navigate("/")}
                    />
                </div>
            </Card>
        </div>
    );
}

