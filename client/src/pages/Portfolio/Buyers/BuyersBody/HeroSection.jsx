import React from "react";
import buyerHeroImg from "../../../../assets/svg/buyerHeroImg.svg";

const HeroSection = () => {
  return (
    <div className="flex justify-between">
      <div className="pt-40 pl-20 w-[55%]">
        <p className="text-2xl uppercase">
          fast website support & maintainence
        </p>
        <h1 className="text-6xl mt-4 mb-12 w-[80%]">
          Get the subscribers you need quickly and easily.
        </h1>
        <div className="">
          <h1 className="text-lg">
            Numerous customers rely on our website support.
          </h1>
        </div>
      </div>
      <div className="w-[45%] pr-16 pt-20">
        <img src={buyerHeroImg} />
      </div>
    </div>
  );
};

export default HeroSection;
