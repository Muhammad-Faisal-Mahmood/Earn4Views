import React, { useEffect, useState } from "react";
import WinningPlatformCard from "./WinningPlatformCard";
import { Base_Api } from "../../../../utils/BaseApi";

const WinningPlatforms = () => {
  const [platformEarningsData, setplatformEarningsData] = useState([]);
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(
          Base_Api +
          "api/userAuth/getEarnings"
        );
        const data = await response.json();
        console.log(data?.earning);
        setplatformEarningsData(data?.earning);
      } catch (error) {
        console.error("Error fetching earnings:", error);
      }
    };

    fetchPlans();
  }, []);
  const PlatformCards = [
    { cardTitle: "Youtube Views", Icon: "youtube" },
    { cardTitle: "Youtube Likes", Icon: "youtube" },
    { cardTitle: "Youtube Watch Time", Icon: "youtube" },
    { cardTitle: "Instagram Followers", Icon: "instagram" },
    { cardTitle: "Instagram Likes", Icon: "instagram" },
    { cardTitle: "Facebook Followers", Icon: "facebook" },
    { cardTitle: "Tiktok Followers", Icon: "tiktok" },
    { cardTitle: "Google Views", Icon: "google" },
    { cardTitle: "Google Ad Views", Icon: "google" },
  ];
  return (
    <div className="my-20  flex flex-col justify-center items-center lg:my-32">
      <h1 className="text-2xl font-bold text-center lg:text-5xl">
        Winning Platforms
      </h1>
      <div className="grid grid-cols-1 justify-items-center gap-y-10 items-center my-10 md:grid-cols-2  lg:my-20 lg:grid-cols-3">
        {platformEarningsData.map((card, index) => (
          <WinningPlatformCard
            key={index}
            Title={card.Service}
            Icon={card.Channel.toLowerCase()}
            Price={card.Price * 100 + "$"}
            // ConnectionName={"Alex Adamatz"}
            // ConnectionJobTitle={"Youtuber"}
            // ConnectionFollowerCount={"500k"}
          />
        ))}
      </div>
    </div>
  );
};

export default WinningPlatforms;
