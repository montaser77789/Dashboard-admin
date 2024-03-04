import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";

const DashboardLayout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <div className=" flex  space-x-2">
        <Dashboard />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
