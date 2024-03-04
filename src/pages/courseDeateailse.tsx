import { useParams } from "react-router-dom";

import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";

const CourseDeateailse = () => {
  const params = useParams();
  const idcourse = params.courseId;

  const { data } = UseAuthenticatedQuery({
    queryKey: ["course"],
    url: `course/getcourse/${idcourse}`,
  });

  return (
    <div className="courses-parent ">
      <div className="course flex  ">
        <img
          src="https://media.istockphoto.com/id/1466653322/photo/close-up-woman-planting-a-young-fir-tree-in-the-forest-putting-it-down-on-the-ground.jpg?s=1024x1024&w=is&k=20&c=l8UyEA_JKrDlItXNwNFt2ptVpVlT7ftdOTF3MpRQQ5Y="
          className="course-image w-2/5 h-auto"
          alt="img"
        />
        <div className="flex flex-col space-y-2 course_child2 p-4 w-3/5 border-indigo-500 border">
          <div>
            <h2 className="float-left mr-4">Title :</h2>
            <p>{data?.title}</p>
          </div>
          <div>
            <h2 className="float-left mr-4">Subject :</h2>
            <p>{data?.subject}</p>
          </div>

          <div>
            <h2 className="float-left mr-4">Price :</h2>
            <p>{data?.price}</p>
          </div>

          <div>
            <h2 className="float-left mr-4">Colleage-Name :</h2>
            <p>{data?.collegeName}</p>
          </div>

          <div>
            <h2 className="float-left mr-4">University-Name :</h2>
            <p>{data?.UniversityName}</p>
          </div>

          <div>
            <h2 className="float-left mr-4">Level :</h2>
            <p>{data?.level}</p>
          </div>

          <div>
            <h2 className="float-left mr-4">Department :</h2>
            <p>{data?.departement}</p>
          </div>
        </div>
      </div>

      <div className="courses_video w-4/5 m-auto">
        <button className="add_video h-10 px-4 block tracking-wide border-none outline-none rounded-lg text-xl font-semibold text-white bg-blue-500 mt-8 ml-auto">
          Add New Video
        </button>
        <div className="courses_video_card flex flex-wrap justify-center mt-8">
          <iframe
            width="45%"
            height="250px"
            src="https://www.youtube.com/embed/txwMtYXMW9I?si=Hb-2V4olVDwG1EyR"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="mr-4 mb-4"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CourseDeateailse;
