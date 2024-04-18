import { RiSearch2Line } from "react-icons/ri";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import user from "../../assets/svg/profile-user.svg";
import { TiThMenu } from "react-icons/ti";

const Header = () => {
  return (
    <div className="px-4 md:px-[5vw] flex shadow-md justify-between py-2 sm:py-4">
      <div className="md:hidden flex items-center">
        <TiThMenu size={24} />
      </div>
      <div className="hidden md:flex items-center rounded-xl border-gray-300 border px-4 w-[30%]">
        <RiSearch2Line className="text-neutral-400" size={30} />
        <input
          type="text"
          placeholder="Search.."
          className="bg-white outline-none w-full py-1"
        />
      </div>
      <div className="flex gap-2 md:gap-4 items-center">
        <div className="rounded-full p-1 border">
          <IoIosNotificationsOutline size={22} className="text-neutral-500" />
        </div>
        <div className="hidden md:flex">
          <FaUserCircle size={45} className="text-slate-400" />
          {/* <img src={user} className="size-12" /> */}
        </div>
        <div className="md:hidden">
          <FaUserCircle size={35} className="text-slate-400" />
          {/* <img src={user} className="size-12" /> */}
        </div>
        <FaChevronDown size={15} className="text-neutral-400" />
      </div>
    </div>
  );
};

export default Header;
