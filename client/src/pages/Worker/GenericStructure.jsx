import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const GenericStructure = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[90%]">
        <Header className="" />
        <div className="bg-[#F9F9F9]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GenericStructure;
