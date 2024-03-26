import { Link } from "react-router-dom";
import logo from "../../assets/svg/main-logo.svg";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="gradient-background-horizontal flex justify-between px-8 py-2 items-center fixed w-full top-0 z-50">
      <div>
        <img src={logo} className="size-16" />
      </div>
      <div className="flex gap-12 font-bold text-white text-lg">
        <Link to="/">Home</Link>
        <Link to="/workers">Workers</Link>
        <Link to="/buyers">Buyers</Link>
      </div>
      <div>
        <Link to="/login">
          <button className="px-3 py-2 rounded-md bg-white font-bold flex gap-2 items-center">
            <FaUserCircle size={24} />
            Login/Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
