import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axioInstance from "../components/config/config.instance";
import { successmsg } from "../toastifiy";
import Select from "react-select";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import InputErrormesg from "../components/ui/Inputerrormessage";

interface IOption {
  value: string;
  label: string;
}

interface IQuestion {
  question: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  correctChoice?: string;
  correctBolean?: string;
  mark: number;
  role: string;
}

const CreateQuetion = () => {
  const token = Cookies.get("access_token");
  const { Idexam } = useParams();
  const [inputValue, setInputValue] = useState<IQuestion>({
    question: "",
    answer_1: "",
    answer_2: "",
    answer_3: "",
    answer_4: "",
    mark: 1,
    role: "choice",
  });
  const [error, setError] = useState<string>("");
  const [thumbnailCreate, setThumbnailCreate] = useState<File | undefined>();
  console.log(thumbnailCreate);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setError("");
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      setThumbnailCreate(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^\d+$/.test(String(inputValue.mark))) {
      setError("Please enter a valid number.");
      return;
    }
  
    const formData = new FormData();
    if (thumbnailCreate) {
      formData.append("file", thumbnailCreate);
    }
  
    for (const key in inputValue) {
      const value = inputValue[key as keyof IQuestion];
      if (value !== undefined) {
        formData.append(key, String(value));
      }
    }
  
    try {
      const res = await axioInstance.post(`teacher/exam/addquestion/${Idexam}`, formData, {
        headers: { Authorization: token },
      });
      successmsg({ msg: "Created question" });
      setInputValue({ ...inputValue, question: "", answer_1: "", answer_2: "", answer_3: "", answer_4: "", mark: 1, role: "choice" });
      setThumbnailCreate(undefined);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  
  const options: IOption[] =
   [{ value: "choice", label: "choice" }, 
  { value: "bolean", label: "bolean" }];
  const answerOptions: IOption[] = [{ value: "true", label: "true" }, { value: "false", label: "false" }];

  return (
    <div className="lg:w-[100%]">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Create New Question</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:space-x-6">
          <div className="w-full md:w-[90%] space-y-2">
            <div>
              <label className="font-semibold">Type:</label>
              <Select
                onChange={(e) => {
                  const value = e ? e.value : "";
                  setInputValue({ ...inputValue, role: value });
                }}
                options={options}
                className="basic-single w-[50%]"
                classNamePrefix="select"
                name="role"
              />
            </div>
            <div>
              <label className="font-semibold">Question:</label>
              <Textarea
                onChange={handleChange}
                name="question"
                value={inputValue.question}
              />
            </div>
            <div>
              <label className="font-semibold">Upload Image:</label>
              <Input type="file" onChange={handleFileChange} />
            </div>
            {inputValue.role === "choice" && (
              <>
                <div>
                  <label className="font-semibold">Answer 1:</label>
                  <Input
                    onChange={handleChange}
                    name="answer_1"
                    value={inputValue.answer_1}
                  />
                </div>
                <div>
                  <label className="font-semibold">Answer 2:</label>
                  <Input
                    onChange={handleChange}
                    name="answer_2"
                    value={inputValue.answer_2}
                  />
                </div>
                <div>
                  <label className="font-semibold">Answer 3:</label>
                  <Input
                    onChange={handleChange}
                    name="answer_3"
                    value={inputValue.answer_3}
                  />
                </div>
                <div>
                  <label className="font-semibold">Answer 4:</label>
                  <Input
                    onChange={handleChange}
                    name="answer_4"
                    value={inputValue.answer_4}
                  />
                </div>
                <div>
                  <label className="font-semibold">Correct Choice:</label>
                  <Select
                    onChange={(e) => {
                      const value = e ? e.value : "";
                      setInputValue({ ...inputValue, correctChoice: value });
                    }}
                    options={inputValue.role === "choice" ? [
                      { value: "answer_1", label: "answer_1" },
                      { value: "answer_2", label: "answer_2" },
                      { value: "answer_3", label: "answer_3" },
                      { value: "answer_4", label: "answer_4" }
                    ] : []}
                    className="basic-single w-[50%]"
                    classNamePrefix="select"
                    name="correctChoice"
                  />
                </div>
              </>
            )}
            {inputValue.role === "bolean" && (
              <>
                <div>
                  <label className="font-semibold">Answer 1:</label>
                  <Select
                    onChange={(e) => {
                      const value = e ? e.value : "";
                      setInputValue({ ...inputValue, answer_1: value });
                    }}
                    options={answerOptions}
                    className="basic-single w-[50%]"
                    classNamePrefix="select"
                    name="answer_1"
                  />
                </div>
                <div>
                  <label className="font-semibold">Answer 2:</label>
                  <Select
                    onChange={(e) => {
                      const value = e ? e.value : "";
                      setInputValue({ ...inputValue, answer_2: value });
                    }}
                    options={answerOptions}
                    className="basic-single w-[50%]"
                    classNamePrefix="select"
                    name="answer_2"
                  />
                </div>
                <div>
                  <label className="font-semibold">Correct Boolean:</label>
                  <Select
                    onChange={(e) => {
                      const value = e ? e.value : "";
                      setInputValue({ ...inputValue, correctBolean: value });
                    }}
                    options={[
                      { value: "answer_1", label: "answer_1" },
                      { value: "answer_2", label: "answer_2" }
                    ]}
                    className="basic-single w-[50%]"
                    classNamePrefix="select"
                    name="correctBolean"
                  />
                </div>
              </>
            )}
            <div>
              <label className="font-semibold">Mark:</label>
              <Input
                onChange={handleChange}
                name="mark"
                value={inputValue.mark.toString()}
              />
              <InputErrormesg msg={error} />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-5 md:mt-10 space-y-5 md:space-y-0 md:space-x-5 ">
          <Button className="w-full md:w-auto hover:bg-blue-900">
            Create Question
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuetion;
