import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import BranchData from "@desmoslive/api/src/interfaces/BranchData";
export interface ActiveBranchState {
  id: string | null;
  owner: {
    email: string | null;
  };
}

const initialState: ActiveBranchState = {
  id: null,
  owner: {
    email: null,
  },
};

export const activeBranchSlice = createSlice({
  name: "activeBranch",
  initialState,
  reducers: {
    setActiveBranch: (state, action: PayloadAction<BranchData>) => {
      state.id = action.payload.id;
      state.owner.email = action.payload.owner.email;
    },
  },
});

export const { setActiveBranch } = activeBranchSlice.actions;
export default activeBranchSlice.reducer;
