import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Iusers } from "../interfaces";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import axioInstance from "../components/config/config.instance";
import { successmsg } from "../toastifiy";
import Skeleton from "../components/Skellton";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Cookies from "js-cookie";

export default function HomePage() {
  const [userSearchValue, setUserSearchValue] = useState("");
  const [refrchPage, setrefrchPagee] = useState(0);

  const [searchUser, setSearchUser] = useState<Iusers[]>([]);
  const token = Cookies.get("access_token");

  const chackedUser = useSelector(
    (state: RootState) => state.checkedsubj.userFilter
  );
  const { data, isLoading: isLoadingData } = UseAuthenticatedQuery({
    queryKey: [`users${refrchPage}`],
    url: "teacher/getallstudent",
    config: {
      headers: {
        Authorization: token,
      },
    },
  });
  console.log(data);

  useEffect(() => {
    if (data) {
      const filteredUsers = data.filter((userData: Iusers) =>
        `${userData?.FirstName} ${userData?.LastName}`
          .toLowerCase()
          .includes(userSearchValue.toLowerCase())
      );
      setSearchUser(filteredUsers);
    }
  }, [data, userSearchValue]);

  useEffect(() => {
    if (data) {
      if (chackedUser.length === 0) {
        setSearchUser(data);
      } else {
        const filteredCoursesSubj = data.filter((user: Iusers) =>
          chackedUser.includes(user.level.toLowerCase())
        );
        setSearchUser(filteredCoursesSubj);
      }
    }
  }, [data, chackedUser]);

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserSearchValue(value);
  };
  const BlockedStudent = async (id: string) => {
    try {
      const res = await axioInstance.patch(`teacher/block/${id}`);
      setrefrchPagee((prev) => (prev = prev + 1));

      successmsg({ msg: `${res.data}` });
    } catch (error) {
      console.log(error);
    }
  };
  const unBlockedStudent = async (id: string) => {
    try {
      const res = await axioInstance.patch(`teacher/unblock/${id}`);
      setrefrchPagee((prev) => (prev = prev + 1));
      successmsg({ msg: `${res.data}` });
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoadingData) return <Skeleton />;

  return (
    <div className="w-full  divide-gray-200">
      <div className="w-[50%] mb-2">
        <label>
          Search student
          <Input
            placeholder="Search"
            name="user"
            value={userSearchValue}
            onChange={onchangeHandler}
          />
        </label>
      </div>
      <table className="w-full divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mobile
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Level
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {searchUser?.map((user: Iusers, index: number) => (
            <tr
              key={user._id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-6 py-4 whitespace-nowrap">{`${user.FirstName.toLocaleLowerCase()} ${user.LastName.toLocaleLowerCase()}`}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.mobile}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.level}</td>

              <td className="px-6 py-4 whitespace-nowrap">
                {!user.isBlocked && (
                  <Button
                    variant={"danger"}
                    size={"sm"}
                    onClick={() => {
                      BlockedStudent(user._id);
                    }}
                  >
                    Block
                  </Button>
                )}
                {user.isBlocked && (
                  <Button
                    variant={"cancel"}
                    size={"sm"}
                    onClick={() => {
                      unBlockedStudent(user._id);
                    }}
                  >
                    unBlock
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
