import logo from "../../assets/svg/main-logo.svg";
import SidebarItem from "../../components/SidebarItem";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { UserContext } from "../../App";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Base_Api } from "../../utils/BaseApi";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("e4vToken");

  useEffect(() => {
    if (!user) {
      if(!token){
        navigate("/");
      }
    }
  }, []);



  return (
    <div className="flex flex-col h-[100vh] justify-between two-color-gradient-background-vertical px-2 py-4">
      <div className="flex flex-col items-center">
        <img src={logo} className="size-12 md:size-20" />
        <div className="mt-8 md:mt-16 flex flex-col gap-4">
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
            link={"/dashboard/worker/earning"}
          />
          <SidebarItem
            icon={<FaRegCreditCard size={20} />}
            text={"Withdraw"}
            link={"/dashboard/worker/withdraw"}
          />
        </div>
      </div>
      <div className="hidden lg:flex gap-2  my-4 ">
        <div>
          {!user?.ProfilePhoto && <FaUserCircle size={45} className="text-slate-400" />}
          {user?.ProfilePhoto && <img src={`${Base_Api + "uploads/"+ user?.ProfilePhoto}`} className="size-12 rounded-full" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-white capitalize">{user?.Name}</h1>
            <FaChevronDown size={15} className="text-neutral-500 " />
          </div>
          <div>
            <h1 className="text-[#747475] text-xs break-all">{user?.Email}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
