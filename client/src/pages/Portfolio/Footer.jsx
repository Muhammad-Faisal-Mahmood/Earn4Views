import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import LogoMain from "../../components/LogoMain";
import Partner from "../../assets/img/PartnerLogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="two-color-gradient-background p-6 text-white  md:p-12">
        <div className="flex gap-12 md:gap-0 flex-col md:flex-row justify-between">
          <div className="md:w-[25%] flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="size-16">
                <LogoMain />
              </div>
              <div className="text-xl font-bold uppercase">Earn 4 Views</div>
            </div>
            <div className="text-lg font-bold">
              Grow beyond yourself professionally by increasing followers and
              likes on your social accounts.
            </div>
          </div>
          <div className="flex flex-col gap-2  md:w-[20%]">
            <h1 className="text-xl md:text-2xl font-bold uppercase">
              Services
            </h1>
            <div className="flex flex-col">
              <Link to={"/login"} className="text-lg">
                Youtube Followers & Likes
              </Link>
              <Link to={"/login"} className="text-lg">
                Facebook Followers
              </Link>
              <Link to={"/login"} className="text-lg">
                Instagram Followers
              </Link>
              <Link to={"/login"} className="text-lg">
                Tiktok Followers
              </Link>
              <Link to={"/login"} className="text-lg">
                Google Views
              </Link>
            </div>
          </div>
          <div className="flex gap-8 md:gap-0 flex-row md:w-[40%]">
            <div className="md:flex flex-col gap-2 md:w-[60%]">
              <h1 className="text-xl md:text-2xl font-bold uppercase">
                quick links
              </h1>
              <div className="flex-col flex">
                <Link to={"/"} className="text-lg cursor-pointer">
                  Home
                </Link>
                <Link to={"/workers"} className=" cursor-pointer text-lg">
                  Workers
                </Link>
                <Link to={"/buyers"} className=" cursor-pointer text-lg">
                  Buyers
                </Link>
                <Link to={"/login"} className=" cursor-pointer text-lg">
                  Login & Sign Up
                </Link>
              </div>
            </div>
            <div className="md:flex flex-col gap-2 md:w-[40%]">
              <h1 className="text-xl md:text-2xl font-bold  uppercase">
                Follow us
              </h1>
              <div className="flex gap-4 ">
                <FaFacebook className="size-5 md:size-10" />
                <FaInstagram className="size-5 md:size-10" />
                <FaYoutube className="size-5 md:size-10" />
                <FaTwitter className="size-5 md:size-10" />
              </div>
            </div>
          </div>

          {/* <div className="md:hidden flex gap-20">
          <div className="flex flex-col gap-2 md:w-[15%]">
            <h1 className="text-xl md:text-2xl font-bold uppercase">
              quick links
            </h1>
            <div className="flex flex-col">
              <Link to={"/"} className="text-lg cursor-pointer">
                Home
              </Link>
              <Link to={"/workers"} className=" cursor-pointer text-lg">
                Workers
              </Link>
              <Link to={"/buyers"} className=" cursor-pointer text-lg">
                Buyers
              </Link>
              <Link to={"/login"} className=" cursor-pointer text-lg">
                Login & Sign Up
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:w-[18%]">
            <h1 className="text-xl md:text-2xl font-bold  uppercase">
              Follow us
            </h1>
            <div className="flex gap-4 ">
              <FaFacebook className="size-5 md:size-10" />
              <FaInstagram className="size-5 md:size-10" />
              <FaYoutube className="size-5 md:size-10" />
              <FaTwitter className="size-5 md:size-10" />
            </div>
          </div>
        </div> */}
        </div>

        <div className="flex items-center gap-2 md:gap-4 justify-center md:justify-start">
          <h1 className="text-xl md:text-2xl font-bold uppercase mt-2">
            Partners
          </h1>
          <img className="w-20" src={Partner} alt="" />
          <h1 className="text-xl md:text-2xl font-bold uppercase mt-2">
            MARCO TECH
          </h1>
        </div>
      </div>

      <div className="w-full text-center px-1 py-3 font-bold text-sm md:text-xl">
        © Copyright 2024 Earn 4 Views LTD . All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
