import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { chhakedSubj, chhakedUsers } from "../app/Slices/checkedSubj";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Cookies from "js-cookie";
import { Icourses } from "../interfaces";

const Dashboard = () => {
  const token = Cookies.get("access_token");

  const [showCoursesCheck, setShowCoursesCheck] = useState(false);
  const [showSubjCheck, setshowSubjCheck] = useState(false);

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedSUser, setSelectedUser] = useState<string[]>([]);

  const dispatch = useDispatch();
  dispatch(chhakedSubj(selectedSubjects));
  console.log(selectedSubjects);

  dispatch(chhakedUsers(selectedSUser));
  const { data } = UseAuthenticatedQuery({
    queryKey: [`courses`],
    url: "course/getmycourses",
    config: {
      headers: {
        Authorization: token,
      },
    },
  });
  const allSubjectsSet = new Set();

  data?.forEach((course: Icourses) => {
    allSubjectsSet.add(course.subject);
  });

  const subjects: string[] = Array.from(allSubjectsSet) as string[];

  const onChangeHandlerSubj = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      const { name, checked } = e.target;
      if (checked) {
        setSelectedSubjects((prev) => [...prev, name]);
      } else {
        setSelectedSubjects((prev) => prev.filter((subj) => subj !== name));
      }
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      const { name, checked } = e.target;
      if (checked) {
        setSelectedUser((prev) => [...prev, name]);
      } else {
        setSelectedUser((prev) => prev.filter((subj) => subj !== name));
      }
    }
  };

  const toggleCoursesCheck = () => {
    setShowCoursesCheck((prev) => !prev);
  };
  const toggleCheckboxes = () => {
    setshowSubjCheck((prev) => !prev);
  };

  return (
    <>
      <div className="board min-w-[230px] min-h-screen w-[300px]">
        {/* <img
          className="logo w-[200px] h-[200px]  ml-15"
          src="https://img.freepik.com/free-photo/abstract-glowing-flame-drops-electric-illumination-generative-ai_188544-8092.jpg?w=360&t=st=1709218885~exp=1709219485~hmac=e9352ed08e046cc67ba59c4763122d1cb12ec619b780963a1b0f8cff728e52e1"
          alt="logo"
        /> */}
        <div className="user_parent h-full ml-2 border-r-2 border-indigo-400 p-3">
          <div className="user-icons flex items-center mt-15">
            <FaUser className=" mr-3 text-blue-500 text-2xl" />
            <div
              className="cursor-pointer  flex items-center justify-between"
              onClick={() => {
                toggleCheckboxes();
              }}
            >
              <NavLink to="/dashboard/" className=" text-2xl font-semibold ">
                Student
              </NavLink>

              <FaAngleDown
                size={20}
                className=" bg-indigo-500 ml-2  cursor-pointer"
                style={{ color: "#fff" }}
              />
            </div>
          </div>

          {showSubjCheck && (
            <div className="px-5">
              <div className=" check-parent ml-70 mt-2 ">
                <input
                  name="one"
                  type="checkbox"
                  className="check-box mr-2 cursor-pointer transform scale-125"
                  value="one"
                  onChange={onChangeHandler}
                />
                <label className=" ">One</label>
              </div>

              <div className="check-parent ml-70 mt-2  ">
                <input
                  name="two"
                  type="checkbox"
                  className="check-box mr-2 cursor-pointer transform scale-125"
                  value="two"
                  onChange={onChangeHandler}
                />
                <label className=" ">Two</label>
              </div>

              <div className="check-parent ml-70 mt-2  ">
                <input
                  name="three"
                  type="checkbox"
                  className="check-box mr-2 cursor-pointer transform scale-125"
                  value="three"
                  onChange={onChangeHandler}
                />
                <label className=" ">Three</label>
              </div>

              <div className="check-parent ml-70 mt-2  ">
                <input
                  name="four"
                  type="checkbox"
                  className="check-box mr-2 cursor-pointer transform scale-125"
                  value="four"
                  onChange={onChangeHandler}
                />
                <label className=" ">Four</label>
              </div>
            </div>
          )}

          <div className="user-icons flex items-center  mt-3">
            <FaBookReader className="mr-3 text-blue-500 text-2xl" />
            <div
              className="cursor-pointer  flex items-center justify-between"
              onClick={() => {
                toggleCoursesCheck();
              }}
            >
              <NavLink
                to="/dashboard/allcourses"
                className=" text-2xl font-semibold "
              >
                Courses
              </NavLink>
              <FaAngleDown
                size={20}
                className=" bg-indigo-500 ml-2 cursor-pointer"
                style={{ color: "#fff" }}
              />
            </div>
          </div>

          {showCoursesCheck && (
            <div className="px-5">
              <div className="check-parent ml-70 mt-2">
                {subjects?.map((subject: string) => (
                  <div key={subject}>
                    <input
                      type="checkbox"
                      className="check-box mr-2 cursor-pointer transform scale-125"
                      value={subject}
                      name={subject}
                      onChange={onChangeHandlerSubj}
                    />
                    <label>{subject}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="user-icons flex items-center  mt-3">
            <FaUser className=" mr-3 text-blue-500 text-2xl" />
            <div className="cursor-pointer  flex items-center justify-between">
              <NavLink
                to="/dashboard/accessstudent"
                className=" text-2xl font-semibold "
              >
                Access
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
