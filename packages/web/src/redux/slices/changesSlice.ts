import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpressionChange } from "../../interfaces/changesList";

export interface ChangesState {
  value: ExpressionChange[];
}

const initialState: ChangesState = {
  value: [],
};

export const changesSlice = createSlice({
  name: "changes",
  initialState,
  reducers: {
    setChanges: (state, action: PayloadAction<ExpressionChange[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setChanges } = changesSlice.actions;
export default changesSlice.reducer;
