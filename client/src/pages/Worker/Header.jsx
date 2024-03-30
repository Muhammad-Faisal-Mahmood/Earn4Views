import { RiSearch2Line } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import user from "../../assets/svg/profile-user.svg";

const Header = () => {
  return (
    <div className="mx-[5vw] flex justify-between my-4">
      <div className="flex items-center rounded-xl border-gray-300 border px-4 w-[30%]">
        <RiSearch2Line className="text-neutral-400" size={30} />
        <input
          type="text"
          placeholder="Search.."
          className="bg-white outline-none w-full py-1"
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="rounded-full p-1 border">
          <IoIosNotificationsOutline size={22} className="text-neutral-500" />
        </div>
        <img src={user} className="size-12" />
        <FaChevronDown size={15} className="text-neutral-400" />
      </div>
    </div>
  );
};

export default Header;
