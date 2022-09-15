import userSlice from "../user/userSlice";
import ticketSlice from "../ticket/ticketSlice";
import projectSlice from "../projects/projectSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userSlice,
    projects: projectSlice,
    tickets: ticketSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
