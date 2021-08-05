import { configureStore } from "@reduxjs/toolkit";
import activeGraphReducer from "./slices/activeGraphSlice";
import authReducer from "./slices/authSlice";
import expressionsReducer from "./slices/expressionsSlice";

export const store = configureStore({
  reducer: {
    activeGraph: activeGraphReducer,
    auth: authReducer,
    expressions: expressionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
