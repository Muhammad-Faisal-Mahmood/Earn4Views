import React from "react";
import HeroSection from "./HeroSection";
import FamousConnections from "./FamousConnections";
import HomeBuyPlans from "../../Home/HomeBody/HomeBuyPlans";

const BuyersBody = () => {
  return (
    <>
      <HeroSection Heading={"Get the subscribers you need quickly and easily."}/>
      <FamousConnections />
      <HomeBuyPlans />
    </>
  );
};

export default BuyersBody;
