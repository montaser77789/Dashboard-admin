import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Button from "../components/ui/Button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const VidoeCode = () => {
  const params = useParams();
  const videoId = params.videoId;
  const token = Cookies.get("access_token");
  const { data } = UseAuthenticatedQuery({
    queryKey: ["videocode"],
    url: `video/getcodes/${videoId}`,
    config: {
      headers: {
        Authorization: token,
      },
    },
  });
  const { data: getusedcodesdata } = UseAuthenticatedQuery({
    queryKey: ["video"],
    url: `video/getusedcodes/${videoId}`,
    config: {
      headers: {
        Authorization: token,
      },
    },
  });
  const handleCreatePDF = () => {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    autoTable(doc, {
      head: [["Number", "Unused Code video"]],
      body: data?.map((code: string, index: number) => [index + 1, code]),
    });
    doc.save("your_document.pdf");
  };
  return (
    <div className="flex justify-between w-full">
      <div className="overflow-x-auto rounded-lg border border-gray-200 w-[50%]">
        <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="divide-x divide-gray-200">
            <tr className="flex justify-between">
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Number
              </th>
              <th className="whitespace-nowrap py-2 font-medium text-gray-900">
                Unused Code video
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.length !== 0 ? (
              data?.map((code: string, index: number) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {code}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  No Codes
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  No Codes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 w-[50%]">
        <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="divide-x divide-gray-200">
            <tr className="flex justify-between">
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Number
              </th>
              <th className="whitespace-nowrap py-2 font-medium text-gray-900">
                Used Code video
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getusedcodesdata?.length !== 0 ? (
              getusedcodesdata?.map((code: string, index: number) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {code}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  No Codes
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  No Codes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div>
        <Button onClick={handleCreatePDF}>Download PDF</Button>
      </div>
    </div>
  );
};
export default VidoeCode;
