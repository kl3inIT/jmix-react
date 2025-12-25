import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type NotificationSeverity = "success" | "info" | "warn" | "error";

export interface Notification {
    id: string;
    severity: NotificationSeverity;
    summary: string;
    detail?: string;
    timeout?: boolean;
}

interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        notify(state, action: PayloadAction<Notification>) {
            const exists = state.notifications.some(
                (n) => n.id === action.payload.id
            );
            if (exists) return;

            state.notifications.unshift({
                ...action.payload,
                timeout:
                    action.payload.timeout ??
                    action.payload.severity !== "error",
            });
        },

        removeNotification(state, action: PayloadAction<string>) {
            state.notifications = state.notifications.filter(
                (n) => n.id !== action.payload
            );
        },

        clearNotifications(state) {
            state.notifications = [];
        },
    },
});

export const {
    notify,
    removeNotification,
    clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
