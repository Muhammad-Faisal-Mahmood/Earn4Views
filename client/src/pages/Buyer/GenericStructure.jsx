import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const GenericStructure = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="absolute w-[84%] left-[16vw] md:w-[79.8%] md:left-[20vw]">
        <Header className="" />
        <div className="bg-[#F9F9F9]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GenericStructure;
