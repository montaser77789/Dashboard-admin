import { configureStore } from "@reduxjs/toolkit";
import checkedSubj from "./Slices/checkedSubj";
import { useDispatch } from "react-redux";
import selectedQuestion from "./Slices/selectedQuestion";
import exam from "./Slices/exam";

export const store = configureStore({
  reducer: {
    checkedsubj: checkedSubj,
    selectedQuestion:selectedQuestion,    
    exam: exam,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch


