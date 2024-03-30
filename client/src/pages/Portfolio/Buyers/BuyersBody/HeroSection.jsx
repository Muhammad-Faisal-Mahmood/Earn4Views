import React from "react";
import buyerHeroImg from "../../../../assets/svg/buyerHeroImg.svg";
import workerHeroImg from "../../../../assets/svg/WorkersHeroImg.svg";

const HeroSection = ({ Heading, Workers }) => {
  const HeadingClasses =
    "mt-4 mb-6 w-[95%] font-bold text-2xl md:w-[70%] lg:mb-12 lg:w-[80%] " +
    (Workers === true ? "lg:text-4xl xl:text-5xl" : "lg:text-5xl xl:text-6xl");

  const HeroImgClasses =
    "mt-12 px-10 lg:w-[45%] md:pt-12 lg:pr-10 lg:pt-20 " +
    (Workers === true ? "hidden lg:block " : "");
  return (
    <div className="flex-col justify-between md:flex md:flex-row">
      <div className="pt-28 pl-10 lg:pl-20 lg:w-[65%] lg:pt-40 xl:w-[55%]">
        <p className="text-sm font-bold uppercase md:text-lg lg:text-xl xl:text-2xl">
          fast website support & maintainence
        </p>
        <h1 className={HeadingClasses}>{Heading}</h1>
        <div className="">
          <h1 className="text-sm lg:text-lg">
            Numerous customers rely on our website support.
          </h1>
        </div>
      </div>
      <div className={HeroImgClasses}>
        <img src={Workers ? workerHeroImg : buyerHeroImg} />
      </div>
    </div>
  );
};

export default HeroSection;
