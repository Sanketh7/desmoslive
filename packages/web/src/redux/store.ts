import { configureStore } from "@reduxjs/toolkit";
import activeGraphReducer from "./slices/activeGraphSlice";
import authReducer from "./slices/authSlice";
import changesReducer from "./slices/changesSlice";

export const store = configureStore({
  reducer: {
    activeGraph: activeGraphReducer,
    auth: authReducer,
    changes: changesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
