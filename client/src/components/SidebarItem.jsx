import { Link } from "react-router-dom";

const SidebarItem = ({ icon, text, link, active }) => {
  return (
    <Link
      className={`flex gap-2 px-4 py-2 ${
        active ? "text-black bg-white" : "text-white "
      }  w-40 rounded-full items-center`}
    >
      {icon}
      {text}
    </Link>
  );
};

export default SidebarItem;
