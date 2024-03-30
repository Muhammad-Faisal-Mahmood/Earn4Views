import user from "../../assets/svg/profile-user.svg";
import logo from "../../assets/svg/main-logo.svg";
import SidebarItem from "../../components/SidebarItem";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-[100vh] justify-between two-color-gradient-background-vertical p-4">
      <div className="flex flex-col items-center">
        <img src={logo} className="size-20" />
        <div className="mt-16 flex flex-col gap-4">
          <SidebarItem
            icon={<FaHome size={20} />}
            text={"Home"}
            link={"/home"}
            active={true}
          />
          <SidebarItem
            icon={<FaUserCircle size={20} />}
            text={"Profile"}
            link={"/profile"}
            active={false}
          />
          <SidebarItem
            icon={<FaRegCreditCard size={20} />}
            text={"Earning"}
            link={"/earning"}
            active={false}
          />
          <SidebarItem
            icon={<FaRegCreditCard size={20} />}
            text={"Withdraw"}
            link={"/withdraw"}
            active={false}
          />
        </div>
      </div>
      <div className="flex my-4 ">
        <img src={user} className="size-12" />
        <div className="px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-white">Anna Karin</h1>
            <FaChevronDown size={15} className="text-neutral-500 " />
          </div>
          <div className="">
            <p className="text-neutral-500 ">annakarin@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
