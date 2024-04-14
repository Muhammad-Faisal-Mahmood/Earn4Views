import { Link, useLocation } from "react-router-dom";
import HandSettingSvg from "./HandSettingSvg";
import React from "react";


const SidebarItem = ({ icon, text, link, }) => {
  const location = useLocation();
  const isActive = location.pathname === link;
  console.log(isActive)
  return (
    <Link
      to={link}
      className={`flex gap-2 px-4 py-2 ${
        isActive ? "text-black bg-white" : "text-white "
      }  w-40 rounded-full items-center`}
    >
      {!icon  && <HandSettingSvg active={isActive}/>}
      {typeof icon !== "string" && icon}
      {text}
    </Link>
  );
};

export default SidebarItem;
