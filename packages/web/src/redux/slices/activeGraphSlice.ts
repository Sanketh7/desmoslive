import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ActiveGraphState {
  name: string | null;
  id: string | null;
  isOwner: boolean;
}

const initialState: ActiveGraphState = {
  name: null,
  id: null,
  isOwner: false,
};

export const activeGraphSlice = createSlice({
  name: "activeGraph",
  initialState,
  reducers: {
    setActiveGraph: (
      state,
      action: PayloadAction<{ name: string; id: string; isOwner: boolean }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isOwner = action.payload.isOwner;
    },
  },
});

export const { setActiveGraph } = activeGraphSlice.actions;
export default activeGraphSlice.reducer;
