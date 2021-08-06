import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ActiveBranchState {
  id: string | null;
  isOwner: boolean;
}

const initialState: ActiveBranchState = {
  id: null,
  isOwner: false,
};

export const activeBranchSlice = createSlice({
  name: "activeBranch",
  initialState,
  reducers: {
    setActiveBranch: (
      state,
      action: PayloadAction<{ id: string; isOwner: boolean }>
    ) => {
      state.id = action.payload.id;
      state.isOwner = action.payload.isOwner;
    },
  },
});

export const { setActiveBranch } = activeBranchSlice.actions;
export default activeBranchSlice.reducer;
