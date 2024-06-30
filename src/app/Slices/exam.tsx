import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IQuestion {
  question: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  mark: string;
  role: string;
  correctBoolean: boolean;
  correctChoice: string;
  imgFile?: File | undefined;
  [key: string]: string | boolean | File | undefined | null;
}

interface Question extends IQuestion {
  imgFile?: File | undefined;
}

interface ExamState {
  inputValue: {
    title: string;
    total_mark: string;
    subject: string;
    level?: string;
    department?: string;
    start?: string;
    end?: string;
    imgFiles: File[];
  };
  questions: Question[];
}


const initialState: ExamState = {
  inputValue: {
    title: "",
    total_mark: "",
    subject: "",
    level: "",
    department: "",
    start: "",
    end: "",
    imgFiles: [],
  },
  questions: [],
};
const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setInputValue(state, action: PayloadAction<Partial<ExamState['inputValue']>>) {
      state.inputValue = { ...state.inputValue, ...action.payload };
    },
    updateQuestion(state, action: PayloadAction<{ index: number; question: Partial<Question> }>) {
      const { index, question } = action.payload;
      state.questions[index] = { ...state.questions[index], ...question };

      if (question.imgFile) {
        state.questions[index].imgFile = question.imgFile;
        state.inputValue.imgFiles.push(question.imgFile);
      }
    },
    removeImgFile(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.inputValue.imgFiles.splice(index, 1);
    },
    addQuestion(state) {
      state.questions.push({
        question: "",
        answer_1: "",
        answer_2: "",
        answer_3: "",
        answer_4: "",
        mark: "",
        role: "",
        correctBoolean: false,
        correctChoice: "",
        imgFile: undefined,
      });
    },
    removeQuestion(state, action: PayloadAction<number>) {
      state.questions.splice(action.payload, 1);
    },
    resetForm(state) {
      state.inputValue = initialState.inputValue;
      state.questions = initialState.questions;
    },
  },
});

export const { setInputValue, updateQuestion, addQuestion, removeQuestion, resetForm, removeImgFile } = examSlice.actions;

export const selectExamInputValue = (state: RootState) => state.exam.inputValue;
export const selectExamQuestions = (state: RootState) => state.exam.questions;

export default examSlice.reducer;

