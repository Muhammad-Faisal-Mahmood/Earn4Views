import React from "react";
import WorkerYoutubePlatformCardImg from "../assets/svg/WorkerYoutubePlatformCard.svg";
import { Link } from "react-router-dom";

const WorkerYoutubePlatformCard = ({ Title, EarningType, Earning }) => {
  const getRoute = (title) => {
    return title
      .replace(/YouTube/i, "")
      .replace(/\s/g, "")
      .toLowerCase();
  };

  const route = getRoute(Title);
  return (
    <div className="relative   -z-0 overflow-hidden rounded-md bg-white shadow-basic ">
      <img
        className="absolute w-full  md:scale-[125%]  -z-10 mt-8"
        src={WorkerYoutubePlatformCardImg}
      />
      <h1 className="font-bold w-[100%]  text-[12px] px-4 mt-2">{Title}</h1>

      <div className="rounded-b-md  p-4 text-center text-[10px] font-semibold text-white mt-[60%] md:mt-[50%]">
        <h1 className=" font-bold mb-2">
          {EarningType}
          <span className="ml-5">{Earning}</span>
        </h1>
        <Link
          to={"/dashboard/worker/earning/youtube/" + route}
          className="bg-white text-black   py-1 px-3 rounded-md"
        >
          Start Earning
        </Link>
      </div>
    </div>
  );
};

export default WorkerYoutubePlatformCard;
