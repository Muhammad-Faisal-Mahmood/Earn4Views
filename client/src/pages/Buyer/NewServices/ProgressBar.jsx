import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="bg-neutral-300 h-[5px] w-16 rounded-full">
      <div
        className={`bg-[#4F1C54] h-full ${
          progress === "full"
            ? "w-[100%]"
            : progress === "half"
            ? "w-[50%]"
            : "w-[0%]"
        } rounded-full`}
      ></div>
    </div>
  );
};

export default ProgressBar;
