import { useParams } from "react-router-dom";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import { Icourses } from "../interfaces";
import { Fragment } from "react/jsx-runtime";
import Button from "../components/ui/Button";
import axioInstance from "../components/config/config.instance";
import Cookies from "js-cookie";
import { successmsg } from "../toastifiy";
import { useState } from "react";

const Coursesuser = () => {
  const token = Cookies.get("access_token");

  const params = useParams();
  const userId = params.userId;
  console.log(userId);
  const [refrechData, setRefrechData] = useState(0);
  const { data, isLoading } = UseAuthenticatedQuery({
    queryKey: [`corseuser${refrechData}`],
    url: `course/getcourse/${userId}`,
  });
  console.log(data);
  const onDeleteCourse = async (id: string | undefined) => {
    console.log(userId, id);

    try {
      const res = await axioInstance.delete(
        `teacher/deletecourseinstudent/${userId}/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      setRefrechData((prev) => (prev = prev + 1));
      successmsg({ msg: `${res.data}` });
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) return <h3>Loading...</h3>;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              title
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              price
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              subject
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              collegeName
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              UniversityName
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Level
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              departement
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              DELETE
            </th>
          </tr>
        </thead>

        {data?.length !== 0 ? (
          data?.map((corse: Icourses) => (
            <Fragment key={corse._id}>
              <tbody className="divide-y divide-gray-200" key={corse._id}>
                <tr className={"bg-gray-50"}>
                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {corse.title?.slice(0, 7)}...
                  </td>
                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{corse.price}</td>
                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {corse.subject}
                  </td>
                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {corse.UniversityName?.slice(0, 7)}...
                  </td>
                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {corse.collegeName?.slice(0, 7)}...
                  </td>
                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {corse.level}...
                  </td>
                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {corse.departement?.slice(0, 7)}...
                  </td>

                  <td>
                    <Button
                      variant={"danger"}
                      className="mr-1"
                      size={"sm"}
                      onClick={() => {
                        onDeleteCourse(corse._id);
                      }}
                    >
                      DELETE COURSE
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Fragment>
          ))
        ) : (
          <tbody>
            <tr>
              <td
                colSpan={9}
                className="text-3xl font-bold mb-4 px-6 py-4 whitespace-nowrap text-center"
              >
                No Courses Yet!
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Coursesuser;
