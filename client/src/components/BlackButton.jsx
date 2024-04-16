import React from "react";

const BlackButton = ({ text, action }) => {
  return (
    <button className="bg-black text-xs md:text-lg px-4 md:px-6 py-1 md:py-2 text-white rounded-md">
      {text}
    </button>
  );
};

export default BlackButton;
