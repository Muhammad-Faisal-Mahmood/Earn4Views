import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const EarningInstructions = ({ Instructions }) => {
  console.log(Instructions);
  return (
    <div>
      <h1 className="font-bold text-3xl mb-5">Instruction to Earn Money</h1>
      {Instructions.map((instruction, index) => (
        <h1
          key={index}
          className="flex items-center text-[#7A7878] text-xl my-1"
        >
          <span className="mr-2">
            {<FaCheckCircle size={24} color={"#522182"} />}
          </span>
          {instruction.text}
        </h1>
      ))}
    </div>
  );
};

export default EarningInstructions;
