import React from "react";
import YoutubePlatformImg from "../../../../assets/svg/YoutubePlatformImg.svg";

const WinningPlatformCard = () => {
  return (
    <div className="relative shadow-basic rounded-md w-[80%] -z-50">
      <h1 className="font-bold text-xl px-4 w-fit mt-4   ">Youtube Views</h1>

      <div className="button-gradient-background mt-16 triangle  w-full  flex justify-center items-start  "></div>
      <div className="polygon absolute left-32 top-12 border-gradient-purple  bg-white flex items-center  justify-center  z-50 ">
        <img className=" w-[70%]" src={YoutubePlatformImg} />
      </div>
      <div className="rounded-b-md button-gradient-background p-4 text-center text-white">
        <p className="py-4 text-lg ">
          You can earn from youtube by just watching videos.
        </p>
        <h1 className="text-2xl font-bold pb-10">200$</h1>
      </div>
    </div>
  );
};

export default WinningPlatformCard;
