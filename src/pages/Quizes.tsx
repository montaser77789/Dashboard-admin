import { NavLink } from "react-router-dom";
import Button from "../components/ui/Button";
import Cookies from "js-cookie";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";

import { useState } from "react";
import Skeleton from "../components/Skellton";
import { Iexam } from "../interfaces";
import ButtonDelete from "../components/ButtonDelete";
const token = Cookies.get("access_token");

const Quizes = () => {
  const [refrchData, setRefrchData] = useState(0);
  const { data, isLoading } = UseAuthenticatedQuery({
    queryKey: [`quizes${refrchData}`],
    url: "teacher/exam/get_allexams",
    config: {
      headers: {
        Authorization: token,
      },
    },
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        {isLoading ? (
          <Skeleton />
        ) : (
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {" "}
                  title
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {" "}
                  Result
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {" "}
                  Details
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {" "}
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-3xl font-bold mb-4 px-6 py-4 whitespace-nowrap text-center"
                  >
                    No Exams Yet!
                  </td>
                </tr>
              ) : (
                data?.map((exam: Iexam) => (
                  <tr key={exam._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {" "}
                      {exam.title}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {" "}
                      <Button>
                        <NavLink to={`/quize/result/${exam._id}`}>
                          Show Result
                        </NavLink>
                      </Button>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {" "}
                      <Button>
                        <NavLink to={`/deatels/${exam._id}`}>
                          Show Details
                        </NavLink>
                      </Button>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      <ButtonDelete exam={exam} setRefrchData={setRefrchData} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Quizes;
