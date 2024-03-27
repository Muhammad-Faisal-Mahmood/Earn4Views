import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/svg/main-logo.svg";
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="gradient-background-horizontal  py-1  fixed w-full top-0 z-50">
      <div className="flex justify-between items-center px-4 md:px-8 md:py-2">
        <div>
          <img src={logo} className="size-14 md:size-16" />
        </div>
        <div className="md:gap-12 font-bold text-white text-lg hidden md:flex">
          <Link to="/">Home</Link>
          <Link to="/workers">Workers</Link>
          <Link to="/buyers">Buyers</Link>
        </div>
        <div className="hidden md:flex">
          <Link to="/login">
            <button className="px-3 py-2 rounded-md bg-white font-bold flex gap-2 items-center">
              <FaUserCircle size={24} />
              Login/Signup
            </button>
          </Link>
        </div>
        <div
          className="flex md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {!mobileMenuOpen ? (
            <IoMenu color="white" size={33} />
          ) : (
            <IoClose color="white" size={33} />
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute md:hidden w-full font-bold text-white text-lg  ">
          <div className="flex flex-col m-2 gradient-background-horizontal p-2 rounded-lg">
            <div className="my-2">
              <Link to="/">Home</Link>
            </div>
            <div className="my-2">
              <Link to="/workers">Workers</Link>
            </div>
            <div className="my-2">
              <Link to="/buyers">Buyers</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
