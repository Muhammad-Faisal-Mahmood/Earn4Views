import { RiSearch2Line } from "react-icons/ri";
import { FaChevronDown, FaChevronUp, FaUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import user from "../../assets/svg/profile-user.svg";
import { TiThMenu } from "react-icons/ti";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link, Navigate } from "react-router-dom";
import { Base_Api } from "../../utils/BaseApi";
import { FourDecimalPoints } from "../../utils/FourDecimalPoints";

const Header = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const fetchWorker = async () => {
      if (!user) return;
      try {
        const response = await fetch(Base_Api + "api/worker/getworker", {
          headers: {
            "auth-token": user.authToken,
          },
        });

        const data = await response.json();

        if (data.success) {
          setWorker(data.woker);
        } else {
          // toast.error(data.message || data.error);
        }
      } catch (error) {
        console.log(error.message);
        // toast.error(error.message);
      }
    };

    fetchWorker();
  }, [user]);

  return (
    <div className="px-4 md:px-[5vw] flex shadow-md justify-between md:justify-end py-2 sm:py-4">
      <div className="md:hidden flex items-center">
        <TiThMenu size={24} />
      </div>
      {/* <div className="hidden md:flex items-center rounded-xl border-gray-300 px-4 w-[30%]">
        <RiSearch2Line className="text-neutral-400" size={30} />
        <input
          type="text"
          placeholder="Search.."
          className="bg-white outline-none w-full py-1"
        />
      </div> */}
      <div className="flex gap-2 md:gap-4 items-center relative">
        {/* <div className="rounded-full p-1 border">
          <IoIosNotificationsOutline size={22} className="text-neutral-500" />
        </div> */}
        <div className="hidden md:flex">
          {!user?.ProfilePhoto && (
            <FaUserCircle size={45} className="text-slate-400" />
          )}
          {user?.ProfilePhoto && (
            <img
              src={`${Base_Api + "uploads/" + user?.ProfilePhoto}`}
              className="size-12 rounded-full"
            />
          )}
        </div>
        <div className="md:hidden">
          {!user?.ProfilePhoto && (
            <FaUserCircle size={45} className="text-slate-400" />
          )}
          {user?.ProfilePhoto && (
            <img
              src={`${Base_Api + "uploads/" + user?.ProfilePhoto}`}
              className="size-12 rounded-full"
            />
          )}
        </div>
        <div
          className="cursor-pointer"
          onClick={() => setOpenDropDown(!openDropDown)}
        >
          {openDropDown ? (
            <FaChevronUp size={15} className="text-neutral-400" />
          ) : (
            <FaChevronDown size={15} className="text-neutral-400" />
          )}
        </div>
        {openDropDown && (
          <div className="absolute top-14 right-0 two-color-gradient-background text-neutral-200 p-2 rounded-md w-52  flex flex-col gap-2 ">
            <Link to={"/dashboard/worker/profile"}>
              <h1 className="hover:text-white px-2 py-1 rounded-md hover:bg-neutral-100 hover:bg-opacity-20 cursor-pointer">
                Profile
              </h1>
            </Link>
            <h1 className="hover:text-white px-2 py-1 rounded-md hover:bg-neutral-100 hover:bg-opacity-20 cursor-pointer">
              Balance: ${FourDecimalPoints(worker?.Earning) || 0.0}
            </h1>
            <Link to={"/login"}>
              <h1
                onClick={() => {
                  localStorage.removeItem("e4vToken");
                  setUser(null);
                }}
                className="hover:text-white px-2 py-1 rounded-md hover:bg-neutral-100 hover:bg-opacity-20 cursor-pointer"
              >
                Logout
              </h1>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
