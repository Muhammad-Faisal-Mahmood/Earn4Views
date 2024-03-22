import Logo from "../../assets/svg/main-logo.svg";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="flex gradient-background-horizontal text-white p-12 pb-20 justify-between">
        <div className="w-[25%] flex flex-col gap-4">
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
        <div className="flex flex-col gap-2  w-[20%]">
          <h1 className="text-2xl font-bold uppercase">Services</h1>
          <div>
            <h1 className="text-lg">Youtube Followers & Likes</h1>
            <h1 className="text-lg">Facebook Followers</h1>
            <h1 className="text-lg">Instagram Followers</h1>
            <h1 className="text-lg">Tiktok Followers</h1>
            <h1 className="text-lg">Google Views</h1>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[15%]">
          <h1 className="text-2xl font-bold uppercase">quick links</h1>
          <div>
            <h1 className="text-lg">Home</h1>
            <h1 className="text-lg">Workers</h1>
            <h1 className="text-lg">Buyers</h1>
            <h1 className="text-lg">Login & Sign Up</h1>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[18%]">
          <h1 className="text-2xl font-bold  uppercase">Follow us</h1>
          <div className="flex gap-4 ">
            <FaFacebook size={40} />
            <FaInstagram size={40} />
            <FaYoutube size={40} />
            <FaTwitter size={40} />
          </div>
        </div>
      </div>
      <div className="w-full text-center py-3 font-bold text-xl">
        © Copyright 2024 Earn 4 Views LTD . All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
