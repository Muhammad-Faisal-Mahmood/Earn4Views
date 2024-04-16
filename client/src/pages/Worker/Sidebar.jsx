import logo from "../../assets/svg/main-logo.svg";
import SidebarItem from "../../components/SidebarItem";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { UserContext } from "../../App";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);


  return (
    <div className="flex fixed w-[20vw] flex-col h-[100vh] justify-between two-color-gradient-background-vertical p-4">
      <div className="flex flex-col items-center">
        <img src={logo} className="size-20" />
        <div className="mt-16 flex flex-col gap-4">
          <SidebarItem
            icon={<FaHome size={20} />}
            text={"Home"}
            link={"/dashboard/worker"}
          />
          <SidebarItem
            icon={<FaUserCircle size={20} />}
            text={"Profile"}
            link={"/dashboard/worker/profile"}
          />
          <SidebarItem
            icon={<FaRegCreditCard size={20} />}
            text={"Earning"}
            link={"/dashboard/worker/earning/youtube/view"}
          />
          <SidebarItem
            icon={<FaRegCreditCard size={20} />}
            text={"Withdraw"}
            link={"/dashboard/worker/withdraw"}
          />
        </div>
      </div>
      <div className="flex my-4 ">
        {/* <img src={user} className="size-12" /> */}
        <FaUserCircle size={45} className="text-slate-400" />
        <div className="px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-white">{user?.Name}</h1>
            <FaChevronDown size={15} className="text-neutral-500 " />
          </div>
          <div className="">
            <p className="text-neutral-500 ">{user?.Email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
