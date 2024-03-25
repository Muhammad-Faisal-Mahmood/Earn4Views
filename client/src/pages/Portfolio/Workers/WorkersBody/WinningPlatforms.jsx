import React from "react";
import WinningPlatformCard from "./WinningPlatformCard";

const WinningPlatforms = () => {
  return (
    <div className="my-32 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-center">Winning Platforms</h1>
      <div className="grid grid-cols-3 justify-items-center gap-y-10 items-center my-20">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((keys, index) => (
          <WinningPlatformCard
            key={index}
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
