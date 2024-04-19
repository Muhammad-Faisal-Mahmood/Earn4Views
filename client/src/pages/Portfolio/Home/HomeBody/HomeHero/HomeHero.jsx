import { Link } from "react-router-dom";
import HomeHeroImg from "../../../../../assets/img/HomeHeroImg.svg";
import HomeHeroImgMobile from "../../../../../assets/svg/HomeHeroMobile.svg";

const HomeHero = () => {
  return (
    <div className="flex flex-col  mt-32 overflow-hidden lg:mt-0 lg:flex-row">
      <div className=" items-center w-full flex lg:w-[40%]">
        <div className="px-10 flex gap-6 flex-col items-center text-center lg:text-left lg:items-start lg:pl-20">
          <h1 className="text-xl font-bold lg:text-2xl xl:text-3xl">
            THE POWER OF EARN 4 VIEWS
          </h1>
          <h1 className="text-xl w-[100%] font-bold lg:text-2xl xl:text-3xl ">
            Grow beyond yourself professionally by increasing followers and
            likes on your social accounts.
          </h1>
          <Link
            to={"/login"}
            className="button-gradient-background py-3 px-12 text-white rounded-md w-fit font-bold lg:px-6"
          >
            Start working
          </Link>
        </div>
      </div>
      <div className="hidden w-[65%] lg:block">
        <img className="" src={HomeHeroImg} />
      </div>
      <div className="block w-full mt-10 lg:hidden">
        <img className="w-full" src={HomeHeroImgMobile} />
      </div>
    </div>
  );
};

export default HomeHero;
