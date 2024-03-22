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
      <div className="text-center">
        <h1 className="font-bold text-3xl mb-2">
          Get Desired Views on Any Social Media Platform
        </h1>
        <p className="text-xl font-normal">
          We've got a wide range of social networks to choose from and track for
        </p>
      </div>
      <div className="flex justify-center w-full ">
        <div className=" my-20 mx-40 flex flex-wrap gap-y-7 gap-x-10 justify-center">
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
