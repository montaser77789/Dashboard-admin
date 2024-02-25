import { useState, useEffect } from "react";
import axioInstance from "../components/config/config.instance";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Iusers } from "../interfaces";
import Button from "../components/ui/Button";
import { NavLink } from "react-router-dom";
export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axioInstance.get("teacher/getAllUser").then((response) => {
      setProducts(response.data);
    });
  }, []);
  console.log(products);

  return (
    <table className="min-w-full divide-y divide-gray-200">
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
        {products.map((user: Iusers, index) => (
          <tr
            key={user._id}
            className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
          >
            <td className="px-6 py-4 whitespace-nowrap">{user.FirstName}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.mobile}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {user.UniversityName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <NavLink to="/viewcorseuser">
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
  );
}
