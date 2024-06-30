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
    url: `teacher/exam/get_exam/${examId}`,
    config: {
      headers: {
        Authorization: token,
      },
    },
  });
console.log(data);

  const onDeleteQuestion = async (id: string) => {
    try {
      const res = await axioInstance.delete(
        `teacher/exam/delete_question/${examId}/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      successmsg({ msg: `${res.data}` });
      setRefrchData((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const renderQuestion = (question: Iquestion) => {
    return (
      <div key={question._id} className="border-black border-2 m-2 p-2 hover:shadow-md rounded-md">
        <div className="bg-white m-2 p-2 min-h-20 hover:shadow-md rounded-md">
          <h1 className="pb-2">
            <span className="text-[#149eca] font-semibold">Question:</span> {question.question}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <div>
              <span className="text-[#149eca] font-semibold">answer1:</span> {question.answer_1}
            </div>
            <div>
              <span className="text-[#149eca] font-semibold">answer2:</span> {question.answer_2}
            </div>
            <div>
              <span className="text-[#149eca] font-semibold">answer3:</span> {question.answer_3}
            </div>
            <div>
              <span className="text-[#149eca] font-semibold">answer4:</span> {question.answer_4}
            </div>
          </div>
          {question.img && (  // Check if image URL exists
            <div className="mt-2">
              <img src={question.img} alt="Question Image" className="max-w-[100px] max-h-[100px]" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 rounded-md">
          <div className="bg-white w-fit m-2 p-2 min-h-10 hover:shadow-md rounded-md">
            <span className="text-[#149eca] font-semibold">Correct choice:</span> {question.correctBolean}
          </div>
          <div className="bg-white w-fit m-2 p-2 min-h-10 hover:shadow-md rounded-md">
            <span className="text-[#149eca] font-semibold">Mark:</span> {question.mark}
          </div>
        </div>
        <Button onClick={() => onDeleteQuestion(question._id)} variant={"danger"}>
          DELETE
        </Button>
      </div>
    );
  };

  return (
    <div className="bg-[#f3f4f7] w-full">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">title</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Total Mark</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{data?.title}</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{data?.total_mark}</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{data?.level}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <h2 className="text-center text-2xl font-extrabold">Question boolean</h2>
        {data?.Questions.length === 0 ? (
          <h2 className="text-center text-2xl font-extrabold m-2">No Questions Yet</h2>
        ) : (
          data?.Questions.map((question: Iquestion) => question.role === "bolean" && renderQuestion(question))
        )}
        <h2 className="text-center text-2xl font-extrabold">Question choice</h2>
        {data?.Questions.length === 0 ? (
          <h2 className="text-center text-2xl font-extrabold m-2">No Questions Yet</h2>
        ) : (
          data?.Questions.map((question: Iquestion) => question.role === "choice" && renderQuestion(question))
        )}
      </div>
    </div>
  );
};

export default ExamDetails;
