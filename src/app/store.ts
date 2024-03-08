import { configureStore } from "@reduxjs/toolkit";
import checkedSubj from "./Slices/checkedSubj";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    checkedsubj: checkedSubj,
    
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch


