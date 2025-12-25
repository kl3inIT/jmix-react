import type {ToastMessage} from "primereact/toast";

export interface Notification extends Omit<ToastMessage, "id" | "life"> {
    id: string;
    /**
     * Whether this notification should time out automatically.
     * Default: true except severity === "error"
     */
    timeout?: boolean;
}

export interface NotificationServiceApi {
    addNotification: (notification: Notification) => void;
    deleteNotificationById: (notificationId: string) => void;
    clearAll: () => void;
}

export interface NotificationServiceState {
    notifications: Notification[];
}
