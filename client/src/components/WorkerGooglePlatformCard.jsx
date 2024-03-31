import React from "react";
import GooglePlatformImg from "../assets/svg/GooglePlatformImg.svg";
import HexagonalPlatform from "../assets/svg/hexagonalplatform.svg";
import WorkerGooglePlatformCardImg from "../assets/svg/WorkerGooglePlatformCard.svg";

const WorkerGooglePlatformCard = ({
  Title,
  Description,
  EarningType,
  Earning,
}) => {
  return (
    <div className="relative   -z-0 overflow-hidden rounded-md bg-white shadow-basic ">
      <img
        className="absolute w-full  md:scale-[125%]  -z-10 mt-8"
        src={WorkerGooglePlatformCardImg}
      />
      <h1 className="font-bold w-[100%]  text-[12px] px-4 mt-2">{Title}</h1>

      <div className="rounded-b-md  p-4 text-center text-[10px] font-semibold text-white mt-[60%] md:mt-[50%]">
        <h1 className=" font-bold">
          {EarningType}
          <span className="ml-5">{Earning}</span>
        </h1>
        <p className="py-2 text-[8px] font-medium ">{Description}</p>
        <button className="bg-white text-black font-medium  py-1 px-3 rounded-md">
          Start Earning
        </button>
      </div>
    </div>
  );
};

export default WorkerGooglePlatformCard;
