import { useParams } from "react-router-dom";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import { Icourses } from "../interfaces";
import { Fragment } from "react/jsx-runtime";
import Cookies from "js-cookie";

const Coursesuser = () => {
  const token = Cookies.get("access_token");

  const params = useParams();
  const userId = params.userId;
  
  const { data, isLoading } = UseAuthenticatedQuery({
    queryKey: [`getcourse}`],
    url: `course/getcourse/${userId}`,
    config: {
      headers: {
        Authorization: token,
      },
    }
  });

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 w-full" >
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
        
          </tr>
        </thead>

        {data?.length !== 0 ? (
          data?.map((corse: Icourses) => (
            <Fragment key={corse._id}>
              <tbody className="divide-y divide-gray-200" key={corse._id}>
                <tr className={"bg-gray-50"}>
                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {corse.title?.slice(0, 20)}
                  </td>
                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{corse.price}</td>
                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {corse.subject}
                  </td>
                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {corse.UniversityName?.slice(0, 20)}
                  </td>
                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {corse.collegeName?.slice(0, 20)}
                  </td>
                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {corse.level}
                  </td>
                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {corse.departement?.slice(0, 20)}
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
