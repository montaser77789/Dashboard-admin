import React, { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import axiosInstance from "../components/config/config.instance"; // Corrected import name
import Cookies from "js-cookie";
import { successmsg } from "../toastifiy";
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
  mark: string;
  role: string;
  correctBoolean: boolean;
  correctChoice: string;
  year: string;
  lec: string;
  image: File | null;
  [key: string]: string | boolean | File | null;
}

const CreateExamToCourse = () => {
  const token = Cookies.get("access_token");
  const [loadingButton, setLoadingButton] = useState(false);
  const [question, setQuestion] = useState<Question>({
    question: '',
    answer_1: '',
    answer_2: '',
    answer_3: '',
    answer_4: '',
    mark: '',
    role: "choice",
    correctBoolean: false,
    correctChoice: '',
    year: '',
    lec: '',
    image: null
  });

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = event.target;
    const updatedQuestion = { ...question };

    if (type === 'checkbox') {
      updatedQuestion[name] = checked;
    } else if (type === 'file' && files) {
      updatedQuestion[name] = files[0];
    } else {
      updatedQuestion[name] = value;
    }

    setQuestion(updatedQuestion);
  };

  const handleRoleChange = (selectedOption: IOption | null) => {
    setQuestion(prevQuestion => ({
      ...prevQuestion,
      role: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleSelectChange = (name: string, selectedOption: IOption | null) => {
    setQuestion(prevQuestion => ({
      ...prevQuestion,
      [name]: selectedOption ? selectedOption.value : ''
    }));
  };

  const [thumbnailCreate, setThumbnailCreate] = useState<File | undefined>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      setThumbnailCreate(files[0]);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(question).forEach(key => {
      const value = question[key as keyof Question];
      if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    if (thumbnailCreate) {
      formData.append("file", thumbnailCreate);
    }

    try {
      setLoadingButton(true);

      const res = await axiosInstance.post("questionbank/add_question", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      console.log(res);

      setQuestion({
        question: '',
        answer_1: '',
        answer_2: '',
        answer_3: '',
        answer_4: '',
        mark: '',
        role: "choice",
        correctBoolean: false,
        correctChoice: '',
        year: '',
        lec: '',
        image: null
      });

      successmsg({ msg: "Question created successfully" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingButton(false);
    }
  };

  const options: IOption[] = [
    { value: "choice", label: "Choice" },
    { value: "boolean", label: "Boolean" }
  ];

  const correctChoiceOptions: IOption[] = [
    { value: "answer_1", label: "Answer 1" },
    { value: "answer_2", label: "Answer 2" },
    { value: "answer_3", label: "Answer 3" },
    { value: "answer_4", label: "Answer 4" }
  ];

  const booleanOptions: IOption[] = [
    { value: "true", label: "True" },
    { value: "false", label: "False" }
  ];

  return (
    <div className="lg:w-[100%] pt-2">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Create New Question</h2>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-4">Question Details</h3>
          <div className="space-y-2 mb-4 border p-4 rounded bg-white shadow-sm">
            <div>
              <label className="font-semibold">Question:</label>
              <Input
                onChange={handleQuestionChange}
                name="question"
                value={question.question}
              />
            </div>
            <div>
              <label className="font-semibold">Role:</label>
              <Select
                onChange={handleRoleChange}
                options={options}
                className="basic-single w-full md:w-[50%]"
                classNamePrefix="select"
                name="role"
                value={options.find(option => option.value === question.role)}
              />
            </div>

            {question.role === "choice" &&
              <div>
                <div>
                  <label className="font-semibold">Answer 1:</label>
                  <Input
                    onChange={handleQuestionChange}
                    name="answer_1"
                    value={question.answer_1}
                  />
                </div>
                <div>
                  <label className="font-semibold">Answer 2:</label>
                  <Input
                    onChange={handleQuestionChange}
                    name="answer_2"
                    value={question.answer_2}
                  />
                </div>
                <div>
                  <label className="font-semibold">Answer 3:</label>
                  <Input
                    onChange={handleQuestionChange}
                    name="answer_3"
                    value={question.answer_3}
                  />
                </div>
                <div>
                  <label className="font-semibold">Answer 4:</label>
                  <Input
                    onChange={handleQuestionChange}
                    name="answer_4"
                    value={question.answer_4}
                  />
                </div>
                <div>
                  <label className="font-semibold">Correct Choice:</label>
                  <Select
                    onChange={(selectedOption) => handleSelectChange('correctChoice', selectedOption)}
                    options={correctChoiceOptions}
                    className="basic-single w-full md:w-[50%]"
                    classNamePrefix="select"
                    name="correctChoice"
                    value={correctChoiceOptions.find(option => option.value === question.correctChoice)}
                  />
                </div>
              </div>
            }

            {question.role === "boolean" &&
              <div>
                <div>
                  <label className="font-semibold">Correct Boolean:</label>
                  <Select
                    onChange={(selectedOption) => handleSelectChange('correctBoolean', selectedOption)}
                    options={booleanOptions}
                    className="basic-single w-full md:w-[50%]"
                    classNamePrefix="select"
                    name="correctBoolean"
                    value={booleanOptions.find(option => option.value === String(question.correctBoolean))}
                  />
                </div>
              </div>
            }

            <div>
              <label className="font-semibold">Mark:</label>
              <Input
                onChange={handleQuestionChange}
                name="mark"
                value={question.mark}
              />
            </div>

            <div>
              <label className="font-semibold">Year:</label>
              <Input
                onChange={handleQuestionChange}
                name="year"
                value={question.year}
              />
            </div>

            <div>
              <label className="font-semibold">Lec:</label>
              <Input
                onChange={handleQuestionChange}
                name="lec"
                value={question.lec}
              />
            </div>

            <div>
              <label className="font-semibold">Image:</label>
              <Input
                type="file"
                onChange={handleFileChange}
                name="image"
              />
            </div>

          </div>
        </div>
        <div className="mt-6">
          <Button type="submit">
            {loadingButton ? "Creating..." : "Create Question"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateExamToCourse;
