import Logo from "../../assets/svg/main-logo.svg";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="flex gap-12 md:gap-0 flex-col md:flex-row two-color-gradient-background text-white p-6 md:p-12 pb-20 justify-between">
        <div className="md:w-[25%] flex flex-col gap-4">
          <div className="flex items-center">
            <div className="size-16">
              <img src={Logo} />
            </div>
            <div className="text-xl font-bold uppercase">Earn 4 Views</div>
          </div>
          <div className="text-lg font-bold">
            Grow beyond yourself professionally by increasing followers and
            likes on your social accounts.
          </div>
        </div>
        <div className="flex flex-col gap-2  md:w-[20%]">
          <h1 className="text-xl md:text-2xl font-bold uppercase">Services</h1>
          <div>
            <h1 className="text-lg">Youtube Followers & Likes</h1>
            <h1 className="text-lg">Facebook Followers</h1>
            <h1 className="text-lg">Instagram Followers</h1>
            <h1 className="text-lg">Tiktok Followers</h1>
            <h1 className="text-lg">Google Views</h1>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-2 md:w-[15%]">
          <h1 className="text-xl md:text-2xl font-bold uppercase">
            quick links
          </h1>
          <div>
            <h1 className="text-lg">Home</h1>
            <h1 className="text-lg">Workers</h1>
            <h1 className="text-lg">Buyers</h1>
            <h1 className="text-lg">Login & Sign Up</h1>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-2 md:w-[18%]">
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

        <div className="md:hidden flex gap-20">
          <div className="flex flex-col gap-2 md:w-[15%]">
            <h1 className="text-xl md:text-2xl font-bold uppercase">
              quick links
            </h1>
            <div>
              <h1 className="text-lg">Home</h1>
              <h1 className="text-lg">Workers</h1>
              <h1 className="text-lg">Buyers</h1>
              <h1 className="text-lg">Login & Sign Up</h1>
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
        </div>
      </div>
      <div className="w-full text-center py-3 font-bold text-lg md:text-xl">
        © Copyright 2024 Earn 4 Views LTD . All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
