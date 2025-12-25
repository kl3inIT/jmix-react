import { combineReducers } from "@reduxjs/toolkit";
import notificationReducer from "@/services/notification/notification.slice";

export const rootReducer = combineReducers({
    notification: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
