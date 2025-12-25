import { useAppDispatch } from "@/store/hooks";
import {
    notify,
    removeNotification,
    clearNotifications,
    type Notification,
} from "./notification.slice";

export const useNotification = () => {
    const dispatch = useAppDispatch();

    return {
        notify: (notification: Notification) =>
            dispatch(notify(notification)),

        remove: (id: string) =>
            dispatch(removeNotification(id)),

        clearAll: () =>
            dispatch(clearNotifications()),
    };
};
