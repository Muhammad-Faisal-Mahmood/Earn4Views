import React from 'react';
import EarningInstructions from "../../../../components/EarningInstructions";
import { IoIosPlayCircle } from "react-icons/io";

const YoutubeWatchTimeEarning = () => {
    const YoutubeWatchTimeEarningInstructions = [
        { text: "Watch full video" },
        { text: "Click Next" },
        { text: "Earning will add" },
      ];
  return (
    <div className="mx-[7vw] flex flex-col gap-12 py-10">
    <EarningInstructions Instructions={YoutubeWatchTimeEarningInstructions} />
    <div className="w-full h-[50vh] bg-[#E3E1E1] rounded-lg flex items-center justify-center">
      <IoIosPlayCircle color="#904DB6" size={86} />
    </div>
    <div className="flex items-center justify-center">
      <button className="two-color-gradient-background-vertical text-white px-16 text-3xl font-bold py-4 rounded-md">
        Next
      </button>
    </div>
  </div>
  )
}

export default YoutubeWatchTimeEarning