import React from "react";
import EarningInstructions from "../../../../components/EarningInstructions";

const GoogleViewEarning = () => {
  const GoogleViewEarningInstructions = [
    { text: "Click button" },
    { text: "See website for 1 minute" },
    { text: "Earning will add" },
  ];
  return (
    <div className="mx-[7vw] flex flex-col gap-10 py-10 h-[100%]">
      <EarningInstructions Instructions={GoogleViewEarningInstructions} />
      <button className="text-white two-color-gradient-background w-full text-3xl font-bold rounded-md py-5">
        Visit Website
      </button>
      <button className="text-[#532283] border-2 border-[#521E5B] w-full text-3xl font-bold rounded-md py-5">
        Next
      </button>
    </div>
  );
};

export default GoogleViewEarning;
