import { Routes, Route } from "react-router";
import LoginPage from "@/pages/login/LoginPage";
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
        </Routes>
    );
}
