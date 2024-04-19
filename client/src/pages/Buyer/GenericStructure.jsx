import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const GenericStructure = () => {
  return (
    <div className="grid grid-cols-1">
      <div className="fixed w-15 md:w-52 h-full">
        <Sidebar />
      </div>
      {/* <div className="absolute w-[84%] left-[16vw] md:w-[84%] md:left-[15vw]"> */}
      <div className="flex-1 overflow-auto pl-16 md:pl-52">
        <Header className="" />
        <div className="bg-[#F9F9F9]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GenericStructure;
