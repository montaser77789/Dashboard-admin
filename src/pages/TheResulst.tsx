import { useParams } from "react-router-dom";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Cookies from "js-cookie";
const token = Cookies.get("access_token");
interface Iresult {
  student_name: string;
  result: string;
  course: string;
}
const TheResulst = () => {
  const parmse = useParams();
  const examId = parmse.examId;
  console.log(examId);

  const { data } = UseAuthenticatedQuery({
    queryKey: ["result"],
    url: `teacher/exam_results/${examId}`,
    config: {
      headers: {
        Authorization: token,
      },
    },
  });
  console.log(data);

  return (
    <div>
      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              the Result
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              course
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((result: Iresult) => (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[200px]">
                {result.student_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[200px]">
                {result.result}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[200px]">
                {result.course}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TheResulst;
