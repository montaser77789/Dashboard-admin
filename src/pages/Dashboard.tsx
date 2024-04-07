import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { chhakedSubj, chhakedUsers } from "../app/Slices/checkedSubj";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Cookies from "js-cookie";
import { Icourses } from "../interfaces";

const Dashboard = () => {
  const token = Cookies.get("access_token");

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
  const logOut = () => {
    Cookies.remove("access_token");
    location.reload();
  };

  return (
    <>
      <div className="dashboard-container min-h-screen screen w-64 bg-white border-r shadow">
        <div className="px-4 py-6 pos">
          <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            Logo
          </span>

          <ul className="mt-6 space-y-1">
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg  text-gray-500 hover:bg-indigo-500 hover:text-white">
                  <span className="text-sm font-medium px-4 py-2  ">
                    {" "}
                    <NavLink to="/">Student</NavLink>{" "}
                  </span>

                  <span className="shrink-0 transition px-4 py-2 rounded-lg duration-300 group-open:-rotate-180 hover:bg-indigo-800 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5  "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <div>
                      <div className="px-5 ">
                        <div className=" check-parent ml-70 mt-2  flex items-center space-x-1">
                          <input
                            name="one"
                            type="checkbox"
                            className="check-box mr-2 cursor-pointer transform scale-125"
                            value="one"
                            onChange={onChangeHandler}
                          />
                          <label className=" ">One</label>
                        </div>

                        <div className="check-parent  mt-2  flex items-center space-x-1">
                          <input
                            name="two"
                            type="checkbox"
                            className="check-box mr-2 cursor-pointer transform scale-125 space-x-1"
                            value="two"
                            onChange={onChangeHandler}
                          />
                          <label className=" ">Two</label>
                        </div>

                        <div className="check-parent mt-2  flex items-center space-x-1">
                          <input
                            name="three"
                            type="checkbox"
                            className="check-box mr-2 cursor-pointer transform scale-125"
                            value="three"
                            onChange={onChangeHandler}
                          />
                          <label className=" ">Three</label>
                        </div>

                        <div className="check-parent mt-2  flex items-center space-x-1">
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
                    </div>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg  text-gray-500 hover:bg-indigo-500 hover:text-white">
                  <span className="text-sm font-medium px-4 py-2  ">
                    {" "}
                    <NavLink to="/allcourses">Courses</NavLink>{" "}
                  </span>

                  <span className="shrink-0 transition px-4 py-2 rounded-lg duration-300 group-open:-rotate-180 hover:bg-indigo-800 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <div className="px-5">
                      <div className="check-parent ml-70 mt-2">
                        {subjects?.map((subject: string) => (
                          <div
                            key={subject}
                            className="flex items-center space-x-1"
                          >
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
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <NavLink
                to="/accessstudent"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-indigo-500 hover:text-white"
              >
                Access
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/addexam"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-indigo-500 hover:text-white"
              >
                Create Exam
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/quize"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-indigo-500 hover:text-white"
              >
                Quize
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <ul className="mt-6 space-y-1 px-4 ">
            <li className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-indigo-500 hover:text-white">
              <NavLink to="/login" onClick={logOut}>
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
