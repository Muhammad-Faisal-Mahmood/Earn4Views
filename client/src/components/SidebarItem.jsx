import { Link } from "react-router-dom";

const SidebarItem = ({ icon, text, link, active }) => {
  return (
    <Link
      to={link}
      className={`flex gap-2 px-4 py-2 ${
        active ? "text-black bg-white" : "text-white "
      }  w-40 rounded-full items-center`}
    >
      {typeof icon === "string" && <img style={{ width: "20px" }} src={icon} />}
      {typeof icon !== "string" && icon}
      {text}
    </Link>
  );
};

export default SidebarItem;
