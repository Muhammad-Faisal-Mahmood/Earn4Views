import React from "react";
import YoutubePlatformImg from "../../../../../assets/svg/YoutubePlatformImg.svg";
import GooglePlatformImg from "../../../../../assets/svg/GooglePlatformImg.svg";
import FacebookPlatformImg from "../../../../../assets/svg/FacebookPlatformImg.svg";
import TiktokPlatformImg from "../../../../../assets/svg/TiktokPlatformImg.svg";
import InstagramPlatformImg from "../../../../../assets/svg/InstagramPlatformImg.svg";
import PlatformCard from "./PlatformCard";

const SocialMediaPlatforms = () => {
  return (
    <div className="my-20">
      <div className="flex flex-col items-center text-center">
        <h1 className="w-[80%] font-bold text-lg mb-2 lg:text-3xl lg:w-full">
          Get Desired Views on Any Social Media Platform
        </h1>
        <p className="w-[80%] text-lg font-normal lg:text-xl lg:w-full">
          We've got a wide range of social networks to choose from and track for
        </p>
      </div>
      <div className="flex justify-center">
        <div className=" my-20 flex flex-wrap gap-y-7 gap-x-10 mx-10 justify-center lg:mx-40 ">
          <PlatformCard
            ImgUrl={YoutubePlatformImg}
            Description={"Youtuber Likes & Subscribers"}
          />
          <PlatformCard
            ImgUrl={InstagramPlatformImg}
            Description={"Instagram Likes & Subscribers"}
          />
          <PlatformCard
            ImgUrl={FacebookPlatformImg}
            Description={"Facebook Likes & Followers"}
          />
          <PlatformCard
            ImgUrl={TiktokPlatformImg}
            Description={"Tiktok Likes & Followers"}
          />
          <PlatformCard
            ImgUrl={GooglePlatformImg}
            Description={"Google Views"}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPlatforms;
