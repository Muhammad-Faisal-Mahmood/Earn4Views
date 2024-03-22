import React from "react";

const PlatformCard = ({ Description, ImgUrl }) => {
  return (
    <div
      className="rounded-md flex flex-col items-center w-[45%] "
      style={{
        boxShadow: "1px 0px 14.899999618530273px 1px rgba(0, 0, 0, 0.25)",
      }}
    >
      <img className="w-20 mt-3" src={ImgUrl} />
      <h1 className="font-semibold my-6">{Description}</h1>
    </div>
  );
};

export default PlatformCard;
