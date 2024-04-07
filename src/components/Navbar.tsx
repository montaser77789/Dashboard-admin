import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const token = Cookies.get("access_token");

  return (
    <div>
      {!token && (
        <nav className=" ml-4 mr-4  mt-1 mb-5   px-10 py-2 rounded-md">
          <ul className="flex items-center justify-evenly">
            <li className="text-black duration-200 font-semibold text-lg">
              <NavLink to="/">Dashboard</NavLink>
            </li>
            <p className="flex items-center space-x-3">
              {!token && (
                <li className="text-black duration-200 font-semibold text-lg">
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
           
            </p>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
