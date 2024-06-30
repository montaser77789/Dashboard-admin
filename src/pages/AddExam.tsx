import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import axioInstance from "../components/config/config.instance";
import Cookies from "js-cookie";
import { successmsg } from "../toastifiy";
import { validationExam } from "../validation/ValidationExam";
import InputErrormesg from "../components/ui/Inputerrormessage";
import { NavLink } from "react-router-dom";
import Select from "react-select";

interface IOption {
  value: string;
  label: string;
}

interface Question {
  question: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  role: string;
  correctBolean: boolean;
  correctChoice: string;
  [key: string]: string | boolean;
}

const AddExam = () => {
  const selected = useSelector((state: RootState) => state.selectedQuestion);
  const token = Cookies.get("access_token");
  const [loadingButton, setLoadingButton] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: "",
    subject: "",
    level: "",
    department: "",
    total_mark: "",
    start: "",
    end: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    title: "",
    totalmark: "",
    subject: "",
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      question: '',
      answer_1: '',
      answer_2: '',
      answer_3: '',
      answer_4: '',
      role: "choice",
      correctBolean: false,
      correctChoice: '',
    }
  ]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleQuestionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const newQuestions = [...questions];

    if (type === 'checkbox') {
      newQuestions[index][name] = checked;
    } else {
      newQuestions[index][name] = value;
    }

    setQuestions(newQuestions);
  };

  const handleRoleChange = (index: number, selectedOption: IOption | null) => {
    const newQuestions = [...questions];
    newQuestions[index].role = selectedOption ? selectedOption.value : '';
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        answer_1: '',
        answer_2: '',
        answer_3: '',
        answer_4: '',
        role: "choice",
        correctBolean: false,
        correctChoice: ''
      }
    ]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions: Question[] = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorMessage = validationExam({
      title: inputValue.title,
      totalmark: inputValue.total_mark,
      subject: inputValue.subject,
    });

    const hasErrorMessage =
      Object.values(errorMessage).some(value => value !== '') &&
      Object.values(errorMessage).every(value => value !== '');

    if (hasErrorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    try {
      const examData = {
        ...inputValue,
        questions: [...questions, ...selected] 
      };
      console.log(examData);

      const res = await axioInstance.post("teacher/exam/addexam", {
        examData
      }, {
        headers: {
          Authorization: token,
        },
      });

      console.log(res);

      successmsg({ msg: "Exam created successfully" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingButton(false);
    }
  };

  const options: IOption[] = [
    { value: "choice", label: "Choice" },
    { value: "boolean", label: "boolean" }
  ];

  return (
    <div className="lg:w-[100%] pt-2">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Create New Exam</h2>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:space-x-6">
          <div className="w-full md:w-[90%] space-y-2">
            <div>
              <label className="font-semibold">Exam Title:</label>
              <Input
                onChange={onChangeHandler}
                name="title"
                value={inputValue.title}
              />
              <InputErrormesg msg={errorMessage.title} />
            </div>
            <div>
              <label className="font-semibold">Exam Subject:</label>
              <Input
                onChange={onChangeHandler}
                name="subject"
                value={inputValue.subject}
              />
              <InputErrormesg msg={errorMessage.subject} />
            </div>
            <div>
              <label className="font-semibold">Exam Level:</label>
              <Input
                onChange={onChangeHandler}
                name="level"
                value={inputValue.level}
              />
            </div>
            <div>
              <label className="font-semibold">Exam Department:</label>
              <Input
                onChange={onChangeHandler}
                name="department"
                value={inputValue.department}
              />
            </div>
          </div>
          <div className="w-full md:w-[48%] space-y-2">
            <div>
              <label className="font-semibold">Total Mark:</label>
              <Input
                onChange={onChangeHandler}
                name="total_mark"
                value={inputValue.total_mark}
              />
              <InputErrormesg msg={errorMessage.totalmark} />
            </div>
            <div>
              <label className="font-semibold">Exam Start:</label>
              <Input
                type="datetime-local"
                lang="en"
                onChange={onChangeHandler}
                name="start"
                value={inputValue.start}
              />
            </div>
            <div>
              <label className="font-semibold">Exam End:</label>
              <Input
                type="datetime-local"
                lang="en"
                onChange={onChangeHandler}
                name="end"
                value={inputValue.end}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-4">Questions</h3>
          {questions.map((question, index) => (
            <div key={index} className="space-y-2 mb-4 border p-4 rounded bg-white shadow-sm">
              <div>
                <label className="font-semibold">Question:</label>
                <Input
                  onChange={(e) => handleQuestionChange(index, e)}
                  name="question"
                  value={question.question}
                />
              </div>
              <div>
                <label className="font-semibold">Role:</label>
                <Select
                  onChange={(selectedOption) => handleRoleChange(index, selectedOption)}
                  options={options}
                  className="basic-single w-full md:w-[50%]"
                  classNamePrefix="select"
                  name="role"
                  value={options.find(option => option.value === question.role)}
                />
              </div>

              { question.role === "choice" && 
              <div>

               <div>
              <label className="font-semibold">Answer 1:</label>
              <Input
                onChange={(e) => handleQuestionChange(index, e)}
                name="answer_1"
                value={question.answer_1}
              />
            </div>
            <div>
              <label className="font-semibold">Answer 2:</label>
              <Input
                onChange={(e) => handleQuestionChange(index, e)}
                name="answer_2"
                value={question.answer_2}
              />
            </div>
            <div>
              <label className="font-semibold">Answer 3:</label>
              <Input
                onChange={(e) => handleQuestionChange(index, e)}
                name="answer_3"
                value={question.answer_3}
              />
            </div>
            <div>
              <label className="font-semibold">Answer 4:</label>
              <Input
                onChange={(e) => handleQuestionChange(index, e)}
                name="answer_4"
                value={question.answer_4}
              />
            </div>
            </div>
 }
            
       

       { question.role === "boolean"  &&    <div>
              <label className="font-semibold">Correct Boolean:</label>
              <input
                type="checkbox"
                onChange={(e) => handleQuestionChange(index, e)}
                name="correctBolean"
                checked={question.correctBolean}
              />
            </div>
}
         
    {   question.role === "choice"  &&       <div>
                <label className="font-semibold">Correct Choice:</label>
                <Input
                  onChange={(e) => handleQuestionChange(index, e)}
                  name="correctChoice"
                  value={question.correctChoice}
                />
              </div>}
              
              <button type="button" onClick={() => removeQuestion(index)} className="mt-2 text-red-600">
                Remove Question
              </button>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <Button type="button" onClick={addQuestion}>
              Add Question
            </Button>
            <Button>
              <NavLink to="/questionbank">Choose from question bank</NavLink>
            </Button>
          </div>
          {selected.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-4">Selected Questions from Question Bank</h3>
              <div className="space-y-4">
                {selected.map((question, index) => (
                  <div key={index} className="space-y-2 mb-4 p-4 rounded bg-blue-50 border border-blue-200 shadow-md">
                    <div>
                      <label className="font-semibold">Question:</label>
                      <p className="text-gray-700">{question.question}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Answer 1:</label>
                      <p className="text-gray-700">{question.answer_1}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Answer 2:</label>
                      <p className="text-gray-700">{question.answer_2}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Answer 3:</label>
                      <p className="text-gray-700">{question.answer_3}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Answer 4:</label>
                      <p className="text-gray-700">{question.answer_4}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Role:</label>
                      <p className="text-gray-700">{question.role}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Correct Boolean:</label>
                      <p className="text-gray-700">{question.correctBolean ? "True" : "False"}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Correct Choice:</label>
                      <p className="text-gray-700">{question.correctChoice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-end mb-2 mt-5 md:mt-10 space-y-5 md:space-y-0 md:space-x-5">
          <Button isloading={loadingButton} className="w-full md:w-auto hover:bg-blue-900">
            Create Exam
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddExam;
