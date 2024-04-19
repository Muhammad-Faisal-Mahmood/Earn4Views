import { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";

const HorizontalSlider = ({ values }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % values.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? values.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  return (
    <>
      <div className="carousel relative">
        <div className="carousel-inner overflow-x-hidden">
          {values.map((item, index) => (
            <div
              key={index}
              className={`carousel-item transition ease-out duration-300 mx-4  ${
                index === currentIndex ? "block" : "hidden"
              }`}
            >
              <TestimonialCard card={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 my-2">
        <button
          className="p-2 rounded-full carousel-control-prev flex items-center justify-center  focus:outline-none focus:ring-2 focus:ring-white two-color-gradient-background"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <RiArrowLeftSLine color="white" size={20} />
        </button>
        <button
          className="p-2 rounded-full carousel-control-next flex items-center justify-center  focus:outline-none focus:ring-2 focus:ring-white two-color-gradient-background"
          onClick={handleNext}
          disabled={currentIndex === values.length - 1}
        >
          <RiArrowRightSLine color="white" size={20} />
        </button>
      </div>
    </>
  );
};

export default HorizontalSlider;
