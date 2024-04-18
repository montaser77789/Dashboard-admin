import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Cookies from "js-cookie";
const token = Cookies.get("access_token");


const DashboardLayout = () => {
  return (
    <div className="root-layout">
      {!token && <Navbar />}
      <div className=" flex  space-x-2">
        { token && <Dashboard />}
        <Outlet  />
      </div>
    </div>
  );
};

export default DashboardLayout;
