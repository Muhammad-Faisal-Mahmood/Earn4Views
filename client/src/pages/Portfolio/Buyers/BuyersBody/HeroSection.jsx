import React from "react";
import buyerHeroImg from "../../../../assets/svg/buyerHeroImg.svg";
import workerHeroImg from "../../../../assets/svg/WorkersHeroImg.svg";

const HeroSection = ({ Heading, Workers }) => {
  const classes =
    "mt-4 mb-12 w-[80%] " + (Workers === true ? "text-5xl" : "text-6xl");
  return (
    <div className="flex justify-between">
      <div className="pt-40 pl-20 w-[55%]">
        <p className="text-2xl uppercase">
          fast website support & maintainence
        </p>
        <h1 className={classes}>{Heading}</h1>
        <div className="">
          <h1 className="text-lg">
            Numerous customers rely on our website support.
          </h1>
        </div>
      </div>
      <div className="w-[45%] pr-10 pt-20">
        <img src={Workers ? workerHeroImg : buyerHeroImg} />
      </div>
    </div>
  );
};

export default HeroSection;
