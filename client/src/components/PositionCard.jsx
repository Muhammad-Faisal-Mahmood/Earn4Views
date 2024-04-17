import { FaArrowRight } from "react-icons/fa";
import PropTypes from "prop-types"; // Import PropTypes for optional prop validation

const PositionCard = ({ gradient, stepNumber, text }) => {
  // Prop validation using PropTypes (optional)
  PositionCard.propTypes = {
    gradient: PropTypes.bool, // Optional boolean prop
    stepNumber: PropTypes.string,
    text: PropTypes.string,
  };

  const classes =
    gradient == stepNumber
      ? "flex flex-col gap-6 w-[32%] shadow-md bg-gradient-to-b from-white to-neutral-400 p-4 rounded-xl"
      : "flex flex-col gap-6 w-[32%] shadow-md p-4 rounded-xl";

  return (
    <div className={classes}>
      <h1 className="text-2xl font-semibold">{`0${stepNumber}`}</h1>
      <p className="lg:text-xl font-semibold">{text}</p>
      <div className="flex justify-end">
        {gradient == stepNumber && <FaArrowRight />}
      </div>
    </div>
  );
};

export default PositionCard;
