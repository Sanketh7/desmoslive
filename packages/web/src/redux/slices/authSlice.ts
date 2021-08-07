import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
  email: string | null;
}

const initialState: AuthState = {
  token: null,
  email: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ token: string; email: string }>
    ) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    resetAuth: (state) => {
      state.token = initialState.token;
      state.email = initialState.token;
    },
  },
});

export const { setAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;
