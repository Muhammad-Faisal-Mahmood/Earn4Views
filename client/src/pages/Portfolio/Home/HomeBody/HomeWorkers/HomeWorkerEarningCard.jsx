import React from "react";
import UserAvatar from "../../../../../assets/svg/HomeWorkerAvatar.svg";
import YoutubeIcon from "../../../../../assets/svg/YoutubePlatformImg.svg";

const HomeWorkerEarningCard = () => {
  return (
    <div
      className="rounded-md flex  justify-between px-10  py-2"
      style={{
        boxShadow: "1px 0px 14.899999618530273px 1px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="flex gap-x-2 items-center">
        <img src={UserAvatar} />
        <h1 className="font-bold">Alex Adamatz</h1>
      </div>
      <div className="flex  items-center">
        <img className="w-12" src={YoutubeIcon} />
        <h1>Youtube</h1>
      </div>
      <div className="flex gap-x-2 items-center">
        <p className="font-bold">
          Earnings: <span className="ml-2 font-normal">$200k</span>
        </p>
      </div>
    </div>
  );
};

export default HomeWorkerEarningCard;
