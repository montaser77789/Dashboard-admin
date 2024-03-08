import { useNavigate, useParams } from "react-router-dom";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";

const CourseDeateailse = () => {
  const params = useParams();
  const idcourse = params.courseId;
  const navigate = useNavigate();

  const { data } = UseAuthenticatedQuery({
    queryKey: ["course"],
    url: `course/getcourse/${idcourse}`,
  });

  const toNavigate = () => navigate(-1);

  return (
    <div className="container mx-auto p-8">
      <button
        onClick={toNavigate}
        className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 10l5.146-5.146a.5.5 0 01.708.708L5.707 10l4.44 4.438a.5.5 0 11-.708.708L4.293 10zM12 10a.5.5 0 00-.5.5v9a.5.5 0 001 0v-9a.5.5 0 00-.5-.5z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M14.5 10a.5.5 0 01-.5.5h-9a.5.5 0 010-1h9a.5.5 0 01.5.5z"
            clipRule="evenodd"
          />
        </svg>
        <span>Back</span>
      </button>

      <div className="flex flex-col md:flex-row justify-between">
        <div className="p-4 bg-white rounded-lg shadow-md md:w-2/5">
          <img
            src="https://media.istockphoto.com/id/1466653322/photo/close-up-woman-planting-a-young-fir-tree-in-the-forest-putting-it-down-on-the-ground.jpg?s=1024x1024&w=is&k=20&c=l8UyEA_JKrDlItXNwNFt2ptVpVlT7ftdOTF3MpRQQ5Y="
            alt="Course"
            className="w-full h-auto rounded-lg mb-4"
          />
        </div>

        <div className="flex flex-col space-y-2 course_child2 p-4 w-3/5 border-indigo-500 border">
          <div className="flex items-center h-10 flex-col md:flex-row ">
            <h2 className=" float-left mr-2 font-semibold text-lg">Title :</h2>
            <p>{data?.title}</p>
          </div>
          <div>
            <h2 className="float-left mr-2 font-semibold text-lg ">
              Subject :
            </h2>
            <p>{data?.subject}</p>
          </div>
          <div>
            <h2 className="float-left mr-2 font-semibold text-lg m">Price :</h2>
            <p>{data?.price}</p>
          </div>
          <div>
            <h2 className="float-left mr-2 font-semibold text-lg ">
              College Name :
            </h2>
            <p>{data?.collegeName}</p>
          </div>
          <div>
            <h2 className="float-left mr-2 font-semibold text-lg ">
              University-Name :
            </h2>
            <p>{data?.UniversityName}</p>
          </div>
          <div>
            <h2 className="float-left mr-2 font-semibold text-lg ">Level :</h2>
            <p>{data?.level}</p>
          </div>
          <div>
            <h2 className="float-left mr-4 font-semibold text-lg mb-2">
              Department :
            </h2>
            <p>{data?.departement}</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          Add New Video
        </button>
      </div>

      <div className="flex justify-center mt-8">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/txwMtYXMW9I?si=Hb-2V4olVDwG1EyR"
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
          className="mr-4"
        ></iframe>
      </div>
    </div>
  );
};

export default CourseDeateailse;
