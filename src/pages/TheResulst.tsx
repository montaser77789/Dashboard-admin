import { useParams } from "react-router-dom";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Cookies from "js-cookie";
import Skeleton from "../components/Skellton";
import { Iresult } from "../interfaces";
const token = Cookies.get("access_token");

const TheResulst = () => {
  const parmse = useParams();
  const examId = parmse.examId;

  const { data, isLoading } = UseAuthenticatedQuery({
    queryKey: ["result"],
    url: `teacher/exam/exam_results/${examId}`,
    config: {
      headers: {
        Authorization: token,
      },
    },
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full">
      {isLoading ? (
        <Skeleton />
      ) : (
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
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-3xl font-bold mb-4 px-6 py-4 whitespace-nowrap text-center"
                >
                  No Result Yet!
                </td>
              </tr>
            ) : (
              data?.map((result: Iresult) => (
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
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TheResulst;
