import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ActiveGraphState {
  name: string | null;
  id: string | null;
}

const initialState: ActiveGraphState = {
  name: null,
  id: null,
};

export const activeGraphSlice = createSlice({
  name: "activeGraph",
  initialState,
  reducers: {
    setActiveGraph: (
      state,
      action: PayloadAction<{ name: string; id: string }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { setActiveGraph } = activeGraphSlice.actions;
export default activeGraphSlice.reducer;
