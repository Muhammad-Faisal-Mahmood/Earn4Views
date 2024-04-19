import React from "react";
import WorkerGooglePlatformCardImg from "../assets/svg/WorkerGooglePlatformCard.svg";
import { Link } from "react-router-dom";

const WorkerGooglePlatformCard = ({ Title, EarningType, Earning }) => {
  const getRoute = (title) => {
    return title
      .replace(/Google/i, "")
      .replace(/\s/g, "")
      .toLowerCase();
  };

  const route = getRoute(Title);
  return (
    <div className="flex justify-center">
      <div className="relative w-40 h-44 md:h-48 -z-0 overflow-hidden rounded-md bg-white shadow-basic ">
        <img
          className="absolute bottom-0 scale-[130%] md:scale-[135%] lg:scale-[140%] xl:scale-125 w-full  -z-10 top-14"
          src={WorkerGooglePlatformCardImg}
        />
        <h1 className="font-bold w-[100%] h-5 text-xs px-4 mt-2">{Title}</h1>

        <div className="absolute bottom-5 rounded-b-md flex flex-col w-full items-center justify-center text-center text-2xl font-semibold text-white">
          <h1 className=" font-semibold text-[12px]">
            {EarningType}
            <span className="ml-2">{Earning}</span>
          </h1>
          <Link
            to={"/dashboard/worker/earning/google/" + route}
            className="bg-white w-fit text-black font-medium text-xs py-[2px] px-1 rounded-md"
          >
            Start Earning
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkerGooglePlatformCard;
