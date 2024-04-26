import { useParams } from "react-router-dom";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Button from "../components/ui/Button";
import axioInstance from "../components/config/config.instance";
import { useState } from "react";
import { successmsg } from "../toastifiy";

import Cookies from "js-cookie";
import { Iquestion } from "../interfaces";
const token = Cookies.get("access_token");

const ExamDetails = () => {
  const [refrchData, setRefrchData] = useState(0);

  const parmse = useParams();
  const examId = parmse.examId;
  const { data } = UseAuthenticatedQuery({
    queryKey: [`quiz/${refrchData}`],
    url: `teacher/exam/getexam/${examId}`,
    config: {
      headers: {
        Authorization: token,
      },
    },
  });

  const onDeleteQuestion = async (id: string) => {
    try {
      const res = await axioInstance.delete(
        `teacher/exam/deletequestion/${examId}/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      successmsg({ msg: `${res.data}` });
      setRefrchData((prev) => (prev = prev + 1));
    } catch (error) {
      console.log(error);
    }
  };
  const questionBoolean = data?.Questions.map(
    (question: Iquestion) =>
      question.role == "bolean" && (
        <>
          <div
            key={question._id}
            className="  border-black border-2 m-2 p-2 hover:shadow-md  rounded-md"
          >
            <div className="bg-white m-2 p-2 h-20 hover:shadow-md  rounded-md">
              <h1 className="pb-2 ">
                <span className="text-[#149eca] font-semibold">Question:</span>
                {question.question}
              </h1>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <span className="text-[#149eca] font-semibold">answer1:</span>{" "}
                  {question.answer_1}
                </div>
                <div>
                  <span className="text-[#149eca] font-semibold">answer2:</span>{" "}
                  {question.answer_2}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 rounded-md">
              <div className="bg-white w-fit m-2 p-2 h-10 hover:shadow-md rounded-md">
                <span className="text-[#149eca] font-semibold">
                  Correct choice:
                </span>
                {question.correctBolean}
              </div>
              <div className="bg-white w-fit m-2 p-2 h-10 hover:shadow-md rounded-md">
                <span className="text-[#149eca] font-semibold">Mark:</span>
                {question.mark}
              </div>
            </div>
            <Button
              onClick={() => {
                onDeleteQuestion(question._id);
              }}
              variant={"danger"}
            >
              DELETE
            </Button>
          </div>
        </>
      )
  );
  const questionChoice = data?.Questions.map(
    (question: Iquestion) =>
      question.role == "choice" && (
        <>
          <div
            key={question._id}
            className="  border-black border-2 m-2 p-2 hover:shadow-md  rounded-md"
          >
            <div className="bg-white m-2 p-2 h-20 hover:shadow-md ">
              <h1 className="pb-2">
                <span className="text-[#149eca] font-semibold">Question:</span>{" "}
                {question.question}
              </h1>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <span className="text-[#149eca] font-semibold">answer1:</span>{" "}
                  {question.answer_1}
                </div>
                <div>
                  <span className="text-[#149eca] font-semibold">answer2:</span>
                  {question.answer_2}
                </div>
                <div>
                  <span className="text-[#149eca] font-semibold">answer3:</span>
                  {question.answer_3}
                </div>
                <div>
                  <span className="text-[#149eca] font-semibold">answer4:</span>
                  {question.answer_4}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white w-fit m-2 p-2 h-10 hover:shadow-md ">
                <span className="text-[#149eca] font-semibold">
                  Correct choice:
                </span>{" "}
                {question.correctChoice}
              </div>
              <div className="bg-white w-fit m-2 p-2 h-10 hover:shadow-md ">
                <span className="text-[#149eca] font-semibold">mark:</span>{" "}
                {question.mark}
              </div>
            </div>
            <Button
              onClick={() => {
                onDeleteQuestion(question._id);
              }}
              variant={"danger"}
            >
              DELETE
            </Button>
          </div>
        </>
      )
  );

  return (
    <div className="bg-[#f3f4f7] w-full">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                {" "}
                title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {" "}
                Total Mark
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {" "}
                Level
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {data?.title}
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {data?.total_mark}
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {data?.level}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <h2 className="text-center text-2xl bold-700 font-extrabold">
          Question bolean
        </h2>

        {data?.Questions.length === 0 ? (
          <h2 className="text-center text-2xl font-extrabold m-2">
            No Question Yet
          </h2>
        ) : (
          questionBoolean
        )}
        <h2 className="text-center text-2xl font-extrabold">
          Question choice !
        </h2>
        {data?.Questions.length === 0 ? (
          <h2 className="text-center text-2xl font-extrabold m-2">
            No Question Yet
          </h2>
        ) : (
          questionChoice
        )}
      </div>
    </div>
  );
};

export default ExamDetails;
