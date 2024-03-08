import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  valueSubjFilter: string[];
  userFilter:string[]
}

const initialState: CounterState = {
  valueSubjFilter: [],
  userFilter:[]
};

export const counterSlice = createSlice({
  name: "checkedsubj",
  initialState,
  reducers: {
    chhakedSubj: (state, action: PayloadAction<string[]>) => {
      state.valueSubjFilter = action.payload;
    },
    chhakedUsers: (state, action: PayloadAction<string[]>) => {
      state.userFilter = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { chhakedSubj,chhakedUsers } = counterSlice.actions;

export default counterSlice.reducer;
