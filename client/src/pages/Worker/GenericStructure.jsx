import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const GenericStructure = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default GenericStructure;
