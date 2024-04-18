import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const EarningInstructions = ({ Instructions }) => {
  console.log(Instructions);
  return (
    <div>
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mb-5">Instruction to Earn Money</h1>
      {Instructions.map((instruction, index) => (
        <h1
          key={index}
          className="flex items-center text-[#7A7878] text-[15px] md:text-[18px] lg:text-xl  my-1"
        >
          <span className="hidden md:block mr-2">
            {<FaCheckCircle size={24} color={"#522182"} />}
          </span>
          <span className=" md:hidden mr-2">
            {<FaCheckCircle size={20} color={"#522182"} />}
          </span>
          {instruction.text}
        </h1>
      ))}
    </div>
  );
};

export default EarningInstructions;
