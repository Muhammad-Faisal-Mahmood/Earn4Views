import React from "react";
import { IoCardOutline } from "react-icons/io5";

const TotalEarningCard = () => {
  return (
    <div className="rounded-2xl bg-[#F3E8FF] w-fit flex flex-col items-center p-6 pb-8">
      <div className="bg-[#BF83FF] rounded-full w-fit p-2 mb-2">
        <IoCardOutline size={30} color="#fff" />
      </div>

      <h1 className="text-[#425166] text-xl">Total Earning</h1>
      <h1 className="text-[#151D48] font-bold text-2xl">600$</h1>
    </div>
  );
};

export default TotalEarningCard;
