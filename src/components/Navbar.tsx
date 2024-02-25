import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" ml-4 mr-4  mt-1 mb-5 bg-indigo-600 px-10 py-5 rounded-md">
      <ul className="flex items-center justify-between">
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="text-white duration-200 font-semibold text-lg">
            <NavLink to="/allcourses">AllCourses</NavLink>
          </li>
        <p className="flex items-center space-x-3">
          <li className="text-white duration-200 font-semibold text-lg">
            <NavLink to="/register">Register</NavLink>
          </li>
          <li className="text-white duration-200 font-semibold text-lg">
            <NavLink to="/login">Login</NavLink>
          </li>
          
        </p>
      </ul>
    </nav>
  );
};

export default Navbar;
