import { Link, useLocation } from "react-router-dom";
import HandSettingSvg from "./HandSettingSvg";
import React from "react";

const SidebarItem = ({ icon, text, link }) => {
  const location = useLocation();
  const isActive = location.pathname === link;
  console.log(isActive);
  return (
    <Link
      to={link}
      className={`flex h-8 w-8 p-[4px] md:px-4 md:py-2 ${
        isActive ? "text-black bg-white" : "text-white "
      }  md:w-40 rounded-full items-center justify-center md:justify-start md:gap-2`}
    >
      <div>
        {!icon && <HandSettingSvg active={isActive} />}
        <div>{typeof icon !== "string" && icon}</div>
      </div>
      <div className="hidden md:flex">{text}</div>
    </Link>
  );
};

export default SidebarItem;
