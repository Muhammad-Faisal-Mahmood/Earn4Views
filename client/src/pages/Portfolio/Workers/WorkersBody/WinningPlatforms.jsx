import React from "react";
import WinningPlatformCard from "./WinningPlatformCard";

const WinningPlatforms = () => {
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
        {PlatformCards.map((card, index) => (
          <WinningPlatformCard
            key={index}
            Title={card.cardTitle}
            Icon={card.Icon}
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
