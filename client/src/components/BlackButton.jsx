import React from "react";

const BlackButton = ({ text, action }) => {
  return (
    <button className="bg-black px-6 py-2 text-white rounded-md">{text}</button>
  );
};

export default BlackButton;
