import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { NavLink } from "react-router-dom";
import axioInstance from "../components/config/config.instance";
import Cookies from "js-cookie";
import { successmsg } from "../toastifiy";

const AddExam = () => {
  const token = Cookies.get("access_token");

  console.log(token);

  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: "",
    subject: "",
    level: "",
    department: "",
    total_mark: "",
    start: "",
    end: "",
  });
  console.log(inputValue);
  
  const [examId, setExamId] = useState(0);
  console.log(examId);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValue({ ...inputValue, [name]: value });
  };
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axioInstance.post("teacher/addexam", inputValue, {
        headers: {
          Authorization: token,
        },
      });
      

      setExamId(res.data._id);
      successmsg({ msg: "Created exam" });
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="lg:w-[100%] pt-2">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Create New Exam</h2>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:space-x-6">
          <div className="w-full md:w-[48%] space-y-2">
            <div>
              <label className="font-semibold">Exam Title:</label>
              <Input
                onChange={onChangeHandler}
                name="title"
                value={inputValue.title}
              />
            </div>
            <div>
              <label className="font-semibold">Exam Subject:</label>
              <Input
                onChange={onChangeHandler}
                name="subject"
                value={inputValue.subject}
              />
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
            </div>
            <div>
              <label className="font-semibold">Exam start:</label>
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
        <div className="flex flex-col md:flex-row justify-between mt-5 md:mt-10 space-y-5 md:space-y-0 md:space-x-5 ">
          {!loading && (
            <Button className="w-full md:w-auto hover:bg-blue-900">
              Create Exam
            </Button>
          )}
        </div>
      </form>
      {loading && (
        <Button>
          <NavLink
            to={`/createQuetion/${examId}`}
            className="w-full md:w-auto hover:bg-blue-900"
          >
            Next
          </NavLink>
        </Button>
      )}
    </div>
  );
};

export default AddExam;
