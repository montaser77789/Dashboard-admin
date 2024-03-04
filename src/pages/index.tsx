import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Iusers } from "../interfaces";
import Button from "../components/ui/Button";
import { NavLink } from "react-router-dom";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Input from "../components/ui/Input";
import { ChangeEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Ipropse {
  one?: boolean;
  two?: boolean;
  three?: boolean;
  four?: boolean;
}
export default function HomePage(value: Ipropse) {
  console.log(value);
  
  const [userSearchValue, setUserSearchValue] = useState("");
  const [searchUser, setSearchUser] = useState<Iusers[]>([]);
  const token = Cookies.get("access_token");

  const { data, isLoading } = UseAuthenticatedQuery({
    queryKey: ["user"],
    url: "teacher/getallstudent",
    config: {
      headers: {
        Authorization: token
      }
    }
  });

  useEffect(() => {
    if (data) {
      const filteredUsers = data.filter((userData: Iusers) =>
        userData?.FirstName?.includes(userSearchValue)
      );
      setSearchUser(filteredUsers);
    }
  }, [data, userSearchValue]);

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserSearchValue(value.toLocaleLowerCase());
  };
  // const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUser({
  //     ...user,
  //     [name]: value,
  //   });
  //   console.log(value);
  //   console.log(searchUser);

  //   if(searchUser){
  //     searchUser = searchUser.filter((user:Iusers)=>{user?.FirstName?.includes(value)})
  //     console.log(searchUser);

  //   }
  // };

  if (isLoading) return <h3>loading...</h3>;

  return (
    <div className="w-full  divide-gray-200">
      <div className="w-[50%]">
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
              UniversityName
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
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
              <td className="px-6 py-4 whitespace-nowrap">
                {user.UniversityName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <NavLink to={`/viewcorseuser/${user._id}`}>
                  <Button size={"sm"}>View Courses</Button>
                </NavLink>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Button size={"sm"}>Dea</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
