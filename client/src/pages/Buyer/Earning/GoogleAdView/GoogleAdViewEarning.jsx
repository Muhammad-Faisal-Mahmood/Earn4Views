import React from "react";
import EarningInstructions from "../../../../components/EarningInstructions";

const GoogleAdViewEarning = () => {
  const GoogleAddViewEarningInstructions = [
    { text: "Click button" },
    { text: "See website till end and copy code from end of the website" },
    { text: "Add code in input field" },
    { text: "Earning will add" },
  ];
  return (
    <div className="mx-[7vw] flex flex-col gap-10 py-10 h-[100%]">
      <EarningInstructions Instructions={GoogleAddViewEarningInstructions} />
      <button className="text-white two-color-gradient-background w-full text-3xl font-bold rounded-md py-5">
        Visit Website
      </button>
      <div className="mb-5">
        <h1 className="font-bold text-3xl">Copy Code:</h1>
        <div className="w-full mt-8  py-5 px-5 rounded-md bg-[#EBEAEA] shadow-md">
          <h1>Code For Wesbite</h1>
        </div>
      </div>
      <button className="text-[#532283] border-2 border-[#521E5B] w-full text-3xl font-bold rounded-md py-5">
        Next
      </button>
    </div>
  );
};

export default GoogleAdViewEarning;
