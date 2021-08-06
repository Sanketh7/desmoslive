import { configureStore } from "@reduxjs/toolkit";
import activeGraphReducer from "./slices/activeGraphSlice";
import authReducer from "./slices/authSlice";
import expressionsReducer from "./slices/expressionsSlice";
import activeBranchReducer from "./slices/activeBranchSlice";

export const store = configureStore({
  reducer: {
    activeGraph: activeGraphReducer,
    auth: authReducer,
    expressions: expressionsReducer,
    activeBranch: activeBranchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
