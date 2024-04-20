import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import axioInstance from "../components/config/config.instance";
import Cookies from "js-cookie";
import { errormsg, successmsg } from "../toastifiy";

const AccessStudent = () => {
  const token = Cookies.get("access_token");

  const [accessStudent, setAccessStudent] = useState({
    id: "",
  });
  const [error, setError] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccessStudent({ ...accessStudent, [name]: value });
    setError("");
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accessStudent.id) {
      setError("Please enter Video ID");
      return;
    }
    try {
      const res = await axioInstance.patch(
        `teacher/access/${accessStudent.id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      successmsg({msg:`${res.data}`})
    } catch (error) {
      console.log(error);
      const { response } = error as { response: { data: string } };
      errormsg({ msg: `${response?.data}` });
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-md">
        <form className="flex flex-col space-y-4" onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="id" className="text-gray-700">
              Student ID:
            </label>
            <Input
              id="id"
              type="text"
              name="id"
              value={accessStudent.id}
              onChange={onChangeHandler}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter Student ID"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <Button
            type="submit"
            className="w-full px-4 py-2 text-white  rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            Access Student
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AccessStudent;
