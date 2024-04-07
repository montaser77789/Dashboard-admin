import { NavLink } from "react-router-dom";
import Button from "../components/ui/Button";
import Cookies from "js-cookie";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import axioInstance from "../components/config/config.instance";
import { successmsg } from "../toastifiy";
import { useState } from "react";
const token = Cookies.get("access_token");

interface Iexam {
  title: string;
  _id: string;
}

const Quizes = () => {
  const [refrchData, setRefrchData] = useState(0);
  const { data } = UseAuthenticatedQuery({
    queryKey: [`quizes${refrchData}`],
    url: "teacher/getallexams",
    config: {
      headers: {
        Authorization: token,
      },
    },
  });
  const onDeleteExam = async (id: string) => {
    try {
      const res = await axioInstance.delete(`teacher/deleteexam/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res);
      successmsg({ msg: `${res.data}` });
      setRefrchData((prev) => (prev = prev + 1));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
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
            {data?.map((exam: Iexam) => (
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
                  {" "}
                  <Button
                    variant={"danger"}
                    onClick={() => {
                      onDeleteExam(exam._id);
                    }}
                  >
                    DELETE
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Quizes;
