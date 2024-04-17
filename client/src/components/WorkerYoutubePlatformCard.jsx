import React from "react";
import YoutubePlatformImg from "../assets/svg/YoutubePlatformImg.svg";
import HexagonalPlatform from "../assets/svg/hexagonalplatform.svg";
import WorkerYoutubePlatformCardImg from "../assets/svg/WorkerYoutubePlatformCard.svg";

const WorkerYoutubePlatformCard = ({
  Title,
  EarningType,
  Earning,
}) => {
  return (
    <div className="relative   -z-0 overflow-hidden rounded-md bg-white shadow-basic ">
      <img
        className="absolute w-full  md:scale-[125%]  -z-10 mt-8"
        src={WorkerYoutubePlatformCardImg}
      />
      <h1 className="font-bold w-[100%]  text-[12px] px-4 mt-2">{Title}</h1>

      <div className="rounded-b-md  p-4 text-center text-[10px] font-semibold text-white mt-[60%] md:mt-[50%]">
        <h1 className=" font-bold">
          {EarningType}
          <span className="ml-5">{Earning}</span>
        </h1>
        <button className="bg-white text-black  py-1 px-3 rounded-md">
          Start Earning
        </button>
      </div>
    </div>
  );
};

export default WorkerYoutubePlatformCard;
