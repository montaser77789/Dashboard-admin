import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import axiosInstance from "../components/config/config.instance";
import Cookies from "js-cookie";
import { successmsg } from "../toastifiy";
import { validationExam } from "../validation/ValidationExam";
import InputErrormesg from "../components/ui/Inputerrormessage";
import { NavLink, useParams } from "react-router-dom";
import Select from "react-select";
import {
  setInputValue,
  updateQuestion,
  addQuestion,
  removeQuestion,
  resetForm,
  removeImgFile,
} from "../app/Slices/exam";
import { resetQuestions } from "../app/Slices/selectedQuestion";

interface IOption {
  value: string;
  label: string;
}

const CreateExamToCourse = () => {
  const params = useParams();
  const courseId = params.courseId;
  const dispatch = useDispatch();

  const selectedQuestions = useSelector((state: RootState) => state.selectedQuestion);
  const token = Cookies.get("access_token");

  const inputValue = useSelector((state: RootState) => state.exam.inputValue);
  const questions = useSelector((state: RootState) => state.exam.questions);

  const [loadingButton, setLoadingButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    title: "",
    totalmark: "",
    subject: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files && files.length > 0) {
      dispatch(setInputValue({ ...inputValue, [name]: files[0] }));
    } else {
      dispatch(setInputValue({ ...inputValue, [name]: value }));
    }
  };

  const handleQuestionChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = event.target;

    let payload = {};
    if (type === "checkbox") {
      payload = { [name]: checked };
    } else {
      payload = { [name]: value };
    }

    dispatch(updateQuestion({ index, question: payload }));
  };

  

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0]; // Get the first file from the list
    if (file) {
      dispatch(updateQuestion({ index, question: { imgFile: file } }));
    }
  };

  const handleImageDelete = (index: number) => {
    dispatch(updateQuestion({ index, question: { imgFile: undefined } }));
    // Also remove from the inputValue.imgFiles
    dispatch(removeImgFile(index));
  };

  const handleRoleChange = (
    index: number,
    selectedOption: IOption | null
  ) => {
    const role = selectedOption ? selectedOption.value : "";
    dispatch(updateQuestion({ index, question: { role } }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const errorMessage = validationExam({
      title: inputValue.title,
      totalmark: inputValue.total_mark,
      subject: inputValue.subject,
    });
  
    const hasErrorMessage =
      Object.values(errorMessage).some((value) => value !== "") &&
      Object.values(errorMessage).every((value) => value !== "");
  
    if (hasErrorMessage) {
      setErrorMessage(errorMessage);
      return;
    }
  
    const formData = new FormData();
  
    // Append text fields from inputValue
    for (const [key, value] of Object.entries(inputValue)) {
      if (typeof value === 'string') {
        formData.append(key, value);
      }
    }
  
    // Append image files from questions
    questions.forEach((question, index) => {
      if (question.imgFile) {
        formData.append(`questions[${index}].imgFile`, question.imgFile);
      }
    });
  
    // Convert combinedQuestions to JSON
    const combinedQuestions = [...questions];
    const questionsJson = JSON.stringify(combinedQuestions.filter(question => question.question)); // Filter out undefined or null questions
  
    formData.append("questions", questionsJson);
  
    // Append selected question IDs from the bank
    const selectedIds = selectedQuestions.map(question => question._id); 

      formData.append("selected_ids", JSON.stringify(selectedIds));
      console.log("selected_ids", JSON.stringify(selectedIds));
      
      

    console.log("selected_ids:", selectedIds);
  
    // Debugging: Log formData content
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    setLoadingButton(true);
    try {
      const res = await axiosInstance.post(
        `teacher/exam/add_exam/${courseId}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
  
      dispatch(resetForm());
      dispatch(resetQuestions());
  
      successmsg({ msg: "Exam created successfully" });
    } catch (error) {
      console.error("Error creating exam:", error);
    } finally {
      setLoadingButton(false);
    }
  };
  
  

  const options: IOption[] = [
    { value: "choice", label: "Choice" },
    { value: "boolean", label: "Boolean" },
  ];


 return (
    <div className="lg:w-full pt-2">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Create New Exam</h2>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="font-semibold">Exam Title:</label>
              <Input onChange={onChangeHandler} name="title" value={inputValue.title} />
              <InputErrormesg msg={errorMessage.title} />
            </div>
            <div>
              <label className="font-semibold">Exam Subject:</label>
              <Input onChange={onChangeHandler} name="subject" value={inputValue.subject} />
              <InputErrormesg msg={errorMessage.subject} />
            </div>
            <div>
              <label className="font-semibold">Exam Level:</label>
              <Input onChange={onChangeHandler} name="level" value={inputValue.level} />
            </div>
            <div>
              <label className="font-semibold">Exam Department:</label>
              <Input onChange={onChangeHandler} name="department" value={inputValue.department} />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="font-semibold">Total Mark:</label>
              <Input onChange={onChangeHandler} name="total_mark" value={inputValue.total_mark} />
              <InputErrormesg msg={errorMessage.totalmark} />
            </div>
            <div>
              <label className="font-semibold">Exam Start:</label>
              <Input type="datetime-local" onChange={onChangeHandler} name="start" value={inputValue.start} />
            </div>
            <div>
              <label className="font-semibold">Exam End:</label>
              <Input type="datetime-local" onChange={onChangeHandler} name="end" value={inputValue.end} />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold">Questions:</h3>
          {questions.map((question, index) => (
            <div key={index} className="mt-6 p-4 border rounded-lg space-y-4">
              <div>
                <label>Question:</label>
                <Input type="text" name="question" value={question.question} onChange={(event) => handleQuestionChange(index, event)} />
              </div>
              <div>
                <label>Question Type:</label>
                <Select value={options.find(option => option.value === question.role)} onChange={(selectedOption) => handleRoleChange(index, selectedOption)} options={options} />
              </div>

              {question.role === "choice" && (
                <div className="space-y-2">
                  <div>
                    <label>Answer 1:</label>
                    <Input type="text" name="answer_1" value={question.answer_1} onChange={(event) => handleQuestionChange(index, event)} />
                  </div>
                  <div>
                    <label>Answer 2:</label>
                    <Input type="text" name="answer_2" value={question.answer_2} onChange={(event) => handleQuestionChange(index, event)} />
                  </div>
                  <div>
                    <label>Answer 3:</label>
                    <Input type="text" name="answer_3" value={question.answer_3} onChange={(event) => handleQuestionChange(index, event)} />
                  </div>
                  <div>
                    <label>Answer 4:</label>
                    <Input type="text" name="answer_4" value={question.answer_4} onChange={(event) => handleQuestionChange(index, event)} />
                  </div>
                  <div>
                    <label>Correct Choice:</label>
                    <Input type="text" name="correctChoice" value={question.correctChoice} onChange={(event) => handleQuestionChange(index, event)} />
                  </div>
                </div>
              )}

              {question.role === "boolean" && (
                <div className="flex items-center gap-2">
                  <label>Correct Boolean:</label>
                  <input type="checkbox" name="correctBoolean" checked={question.correctBoolean} onChange={(event) => handleQuestionChange(index, event)} className="w-6 h-6" />
                </div>
              )}

              <div>
                <label>Mark:</label>
                <Input type="text" name="mark" value={question.mark} onChange={(event) => handleQuestionChange(index, event)} />
              </div>

              <div>
                <label>Image:</label>
                <Input type="file" name="imgFile" onChange={(e) => handleFileChange(e, index)} />
                {question.imgFile && (
                  <div className="flex items-center mt-2">
                    <img width="80" height="80" src={URL.createObjectURL(question.imgFile)} alt="question" className="mr-2" />
                    <Button type="button" variant="danger" onClick={() => handleImageDelete(index)}>Delete Image</Button>
                  </div>
                )}
              </div>
              <Button type="button" variant="danger" onClick={() => dispatch(removeQuestion(index))}>Remove Question</Button>
            </div>
          ))}
          <div className="flex gap-4 mt-6">
            <Button type="button" onClick={() => dispatch(addQuestion())}>Add Question</Button>
            <Button type="button">
              <NavLink to="/questionbankselector">Choose from Question bank</NavLink>
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <Button type="submit" isloading={loadingButton}>Create Exam</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateExamToCourse;