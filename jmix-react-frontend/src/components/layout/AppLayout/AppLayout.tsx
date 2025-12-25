import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { PanelMenu } from "primereact/panelmenu";
import { Toolbar } from "primereact/toolbar";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { Divider } from "primereact/divider";
import { Ripple } from "primereact/ripple";
import { useAuth } from "react-oidc-context";
import type { MenuItem } from "primereact/menuitem";

export function AppLayout() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const userMenuRef = useRef<Menu>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const navigateTo = (path: string) => {
        navigate(path);
        setSidebarVisible(false);
    };

    const menuItems: MenuItem[] = [
        {
            label: "Dashboard",
            icon: "pi pi-home",
            className: location.pathname === "/" ? "surface-200" : "",
            command: () => navigateTo("/"),
        },
        {
            label: "Quản lý",
            icon: "pi pi-cog",
            expanded: true,
            items: [
                {
                    label: "Người dùng",
                    icon: "pi pi-users",
                    className: location.pathname === "/user" ? "surface-200" : "",
                    command: () => navigateTo("/user"),
                },
                {
                    label: "Vai trò",
                    icon: "pi pi-shield",
                    className: location.pathname === "/role" ? "surface-200" : "",
                    command: () => navigateTo("/role"),
                },
            ],
        },
        {
            label: "Báo cáo",
            icon: "pi pi-chart-bar",
            className: location.pathname === "/reports" ? "surface-200" : "",
            command: () => navigateTo("/reports"),
        },
    ];

    const userMenuItems: MenuItem[] = [
        {
            label: "Thông tin cá nhân",
            icon: "pi pi-user",
            command: () => navigate("/profile"),
        },
        {
            label: "Cài đặt",
            icon: "pi pi-cog",
            command: () => navigate("/settings"),
        },
        { separator: true },
        {
            label: "Đăng xuất",
            icon: "pi pi-sign-out",
            command: () => auth.signoutRedirect(),
        },
    ];

    const userName = auth.user?.profile?.name || auth.user?.profile?.preferred_username || "User";
    const userInitial = userName.charAt(0).toUpperCase();

    const startContent = (
        <div className="flex align-items-center gap-3">
            <Button
                icon="pi pi-bars"
                rounded
                text
                severity="secondary"
                aria-label="Menu"
                onClick={() => setSidebarVisible(true)}
                className="p-ripple"
            >
                <Ripple />
            </Button>
            <span className="font-bold text-xl text-primary cursor-pointer" onClick={() => navigate("/")}>
                Jmix React
            </span>
        </div>
    );

    const endContent = (
        <div className="flex align-items-center gap-2">
            <Button
                icon="pi pi-bell"
                rounded
                text
                severity="secondary"
                aria-label="Notifications"
            />
            <Avatar
                label={userInitial}
                shape="circle"
                className="cursor-pointer bg-primary text-white"
                onClick={(e) => userMenuRef.current?.toggle(e)}
                aria-label="User menu"
            />
            <Menu model={userMenuItems} popup ref={userMenuRef} />
        </div>
    );

    return (
        <div className="min-h-screen surface-ground">
            {/* Header */}
            <Toolbar
                start={startContent}
                end={endContent}
                className="surface-card shadow-1 border-noround px-4"
            />

            {/* Sidebar */}
            <Sidebar
                visible={sidebarVisible}
                onHide={() => setSidebarVisible(false)}
                className="w-18rem"
                header={
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-th-large text-primary text-xl" />
                        <span className="font-bold text-xl">Menu</span>
                    </div>
                }
            >
                <Divider className="mt-0" />
                <PanelMenu model={menuItems} className="w-full border-none" />
            </Sidebar>

            {/* Main Content */}
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    );
}

