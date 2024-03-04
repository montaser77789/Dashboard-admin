import {  useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const Dashboard = () => {
  const [showCoursesCheck, setShowCoursesCheck] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

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
  console.log(selectedSubjects);

  const toggleCoursesCheck = () => {
    setShowCoursesCheck((prev) => !prev);
  };

  return (
    <>
        <div className="board min-w-[230px] min-h-screen w-[300px]">
          {/* <img
          className="logo w-[200px] h-[200px]  ml-15"
          src="https://img.freepik.com/free-photo/abstract-glowing-flame-drops-electric-illumination-generative-ai_188544-8092.jpg?w=360&t=st=1709218885~exp=1709219485~hmac=e9352ed08e046cc67ba59c4763122d1cb12ec619b780963a1b0f8cff728e52e1"
          alt="logo"
        /> */}
          <div className="user_parent ml-2 border-r-2 border-indigo-400 p-3">
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

            {/* {showCheckboxes && (
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
          )} */}

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
                <div className="check-parent ml-70 mt-2  ">
                  <input
                    type="checkbox"
                    className="check-box mr-2 cursor-pointer transform scale-125"
                    value="maths"
                    name="maths"
                    onChange={onChangeHandlerSubj}
                  />
                  <label className=" ">Maths</label>
                </div>

                <div className="check-parent ml-70 mt-2  ">
                  <input
                    type="checkbox"
                    className="check-box mr-2 cursor-pointer transform scale-125"
                    name="english"
                    value="english"
                    onChange={onChangeHandlerSubj}
                  />
                  <label className=" ">English</label>
                </div>

                <div className="check-parent ml-70 mt-2  ">
                  <input
                    name="physics"
                    type="checkbox"
                    className="check-box mr-2 cursor-pointer transform scale-125"
                    value="physics"
                    onChange={onChangeHandlerSubj}
                  />
                  <label className=" ">Physics</label>
                </div>

                <div className="check-parent ml-70 mt-2  ">
                  <input
                    type="checkbox"
                    className="check-box mr-2 cursor-pointer transform scale-125"
                    value="mechanics"
                    name="mechanics"
                    onChange={onChangeHandlerSubj}
                  />
                  <label className=" ">Mechanics</label>
                </div>
              </div>
            )}
          </div>
        </div>
    </>
  );
};

export default Dashboard;
