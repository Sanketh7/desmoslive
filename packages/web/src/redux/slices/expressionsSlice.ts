import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expression, ExpressionChange } from "../../interfaces/expressions";

export interface ExpressionsState {
  current: Expression[];
  changes: ExpressionChange[];
}

const initialState: ExpressionsState = {
  current: [],
  changes: [],
};

export const expressionsSlice = createSlice({
  name: "expressions",
  initialState,
  reducers: {
    setExpressionsCurrent: (state, action: PayloadAction<Expression[]>) => {
      state.current = action.payload;
    },
    setExpressionsChanges: (
      state,
      action: PayloadAction<ExpressionChange[]>
    ) => {
      state.changes = action.payload;
    },
  },
});

export const { setExpressionsCurrent, setExpressionsChanges } =
  expressionsSlice.actions;

export default expressionsSlice.reducer;
