import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import { useParams } from "react-router-dom";
import axioInstance from "../components/config/config.instance";
import Cookies from "js-cookie";
import { successmsg } from "../toastifiy";
import Select from "react-select";

const CreateQuetion = () => {
  const token = Cookies.get("access_token");

  const parmse = useParams();
  const examId = parmse.Idexam;
  console.log(examId);

  const [inputValue, setInputValue] = useState({
    question: "",
    answer_1: "",
    answer_2: "",
    answer_3: "",
    answer_4: "",
    correctChoice: "",
    correctBolean: "",
    mark: 1,
    role: "choice",
  });

  console.log(inputValue);

  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setInputValue({ ...inputValue, [name]: value });
  };
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axioInstance.post(
        `teacher/addquestion/${examId}`,
        inputValue,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      successmsg({ msg: "Created question" });
      setInputValue({
        question: "",
        answer_1: "",
        answer_2: "",
        answer_3: "",
        answer_4: "",
        correctChoice: "",
        correctBolean: "",
        mark: 1,
        role: "choice",
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const options = [
    { value: "choice", label: "choice" },
    { value: "bolean", label: "bolean" },
  ];
  const optionsanswer1 = [
    { value: "true", label: "true" },
    { value: "false", label: "false" },
  ];
  const optionsanswer2 = [
    { value: "true", label: "true" },
    { value: "false", label: "false" },
  ];
  const optionsCorrectBoolean = [
    { value: "answer_1", label: "answer_1" },
    { value: "answer_2", label: "answer_2" },
  ];
  const correctChoice = [
    { value: "answer_1", label: "answer_1" },
    { value: "answer_2", label: "answer_2" },
    { value: "answer_3", label: "answer_3" },
    { value: "answer_4", label: "answer_4" },
  ];

  return (
    <div className="lg:w-[100%] ">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">create New question</h2>
      </div>
      <form onSubmit={onSubmitHandler}>
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
              <div
                style={{
                  color: "hsl(0, 0%, 40%)",
                  display: "inline-block",
                  fontSize: 12,
                  fontStyle: "italic",
                  marginTop: "1em",
                }}
              ></div>
            </div>

            <div>
              <label className="font-semibold">question:</label>
              <Textarea
                onChange={onChangeHandler}
                name="question"
                value={inputValue.question}
              />
            </div>
            {inputValue.role == "choice" && (
              <>
                <div>
                  <label className="font-semibold">answer_1:</label>
                  <Input
                    onChange={onChangeHandler}
                    name="answer_1"
                    value={inputValue.answer_1}
                  />
                </div>
                <div>
                  <label className="font-semibold">answer_2:</label>
                  <Input
                    onChange={onChangeHandler}
                    name="answer_2"
                    value={inputValue.answer_2}
                  />
                </div>

                <div>
                  <label className="font-semibold">answer_3:</label>
                  <Input
                    onChange={onChangeHandler}
                    name="answer_3"
                    value={inputValue.answer_3}
                  />
                </div>

                <div>
                  <label className="font-semibold">answer_4:</label>
                  <Input
                    onChange={onChangeHandler}
                    name="answer_4"
                    value={inputValue.answer_4}
                  />
                </div>
              </>
            )}

            {inputValue.role == "choice" && (
              <div>
                <label className="font-semibold">correctChoice:</label>

                <Select
                  onChange={(e) => {
                    const value = e ? e.value : "";
                    setInputValue({ ...inputValue, correctChoice: value });
                    
                  }}
                  options={correctChoice}
                  className="basic-single w-[50%]"
                  classNamePrefix="select"
                  name="correctChoice"
                />
                <div
                  style={{
                    color: "hsl(0, 0%, 40%)",
                    display: "inline-block",
                    fontSize: 12,
                    fontStyle: "italic",
                    marginTop: "1em",
                  }}
                ></div>
              </div>
            )}
            {inputValue.role == "bolean" && (
              <>
                <div>
                  <label className="font-semibold">answer_1</label>

                  <Select
                    onChange={(e) => {
                      const value = e ? e.value : "";
                      setInputValue({ ...inputValue, answer_1: value });
                    }}
                    options={optionsanswer1}
                    className="basic-single w-[50%]"
                    classNamePrefix="select"
                    name="answer_1"
                  />
                  <div
                    style={{
                      color: "hsl(0, 0%, 40%)",
                      display: "inline-block",
                      fontSize: 12,
                      fontStyle: "italic",
                      marginTop: "1em",
                    }}
                  ></div>
                </div>

                <div>
                  <label className="font-semibold">answer_2</label>
                  <Select
                    onChange={(e) => {
                      const value = e ? e.value : "";
                      setInputValue({ ...inputValue, answer_2: value });
                    }}
                    options={optionsanswer2}
                    className="basic-single w-[50%]"
                    classNamePrefix="select"
                    name="answer_2"
                  />
                  <div
                    style={{
                      color: "hsl(0, 0%, 40%)",
                      display: "inline-block",
                      fontSize: 12,
                      fontStyle: "italic",
                      marginTop: "1em",
                    }}
                  ></div>
                </div>

                <div>
                  <label className="font-semibold">correctBolean</label>

                  <Select
                    onChange={(e) => {
                      const value = e ? e.value : "";
                      setInputValue({ ...inputValue, correctBolean: value });
                    }}
                    options={optionsCorrectBoolean}
                    className="basic-single w-[50%]"
                    classNamePrefix="select"
                    name="correctBolean"
                  />
                  <div
                    style={{
                      color: "hsl(0, 0%, 40%)",
                      display: "inline-block",
                      fontSize: 12,
                      fontStyle: "italic",
                      marginTop: "1em",
                    }}
                  ></div>
                </div>
              </>
            )}

            <div>
              <label className="font-semibold">Mark:</label>
              <Input
                onChange={onChangeHandler}
                name="mark"
                value={inputValue.mark}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-5 md:mt-10 space-y-5 md:space-y-0 md:space-x-5 ">
          <Button className="w-full md:w-auto hover:bg-blue-900">
            Create Quetion
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuetion;
