import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Iquestion } from "../../interfaces";

// Define the initial state
const initialState: Iquestion[] = [];

// Create the slice
const selectedQuestionSlice = createSlice({
    name: "selectedQuestion",
    initialState,
    reducers: {
        addQuestion: (state, action: PayloadAction<Iquestion>) => {
            state.push(action.payload);
        },
        resetQuestions: () => initialState
    },
});

// Action creators are generated for each case reducer function
export const { addQuestion, resetQuestions } = selectedQuestionSlice.actions;

// Export the reducer to be used in the store
export default selectedQuestionSlice.reducer;
