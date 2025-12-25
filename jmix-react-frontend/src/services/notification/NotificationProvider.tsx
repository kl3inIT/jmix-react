import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeNotification } from "./notification.slice";

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const toastRef = useRef<Toast>(null);
    const dispatch = useAppDispatch();

    const notifications = useAppSelector(
        (state) => state.notification.notifications
    );

    useEffect(() => {
        notifications.forEach((n) => {
            toastRef.current?.show({
                id: n.id,
                severity: n.severity,
                summary: n.summary,
                detail: n.detail,
                life: n.timeout ? 4000 : 0,
            });
        });
    }, [notifications]);

    return (
        <>
            {children}
            <Toast
                ref={toastRef}
                onRemove={(message) => {
                    if (message?.id) {
                        dispatch(removeNotification(message.id as string));
                    }
                }}
            />
        </>
    );
};
