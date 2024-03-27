import React from "react";
import HeroSection from "./HeroSection";
import FamousConnections from "./FamousConnections";
import HomeBuyPlans from "../../Home/HomeBody/HomeBuyPlans";

const BuyersBody = () => {
  return (
    <>
      <HeroSection
        Heading={"Get the subscribers you need quickly and easily."}
      />
      <div className="hidden md:block">
        <FamousConnections />
        <HomeBuyPlans />
      </div>
      <div className="md:hidden ock">
        <HomeBuyPlans />
        <FamousConnections />
      </div>
    </>
  );
};

export default BuyersBody;
