import PropTypes from "prop-types";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const PlansCard = ({ title, price, features }) => {
  // Prop validation using PropTypes
  PlansCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  return (
    <div className="border-2 p-8 rounded-lg md:w-[30%] w-full">
      <h1 className="text-center text-2xl font-bold">{title}</h1>
      <h1 className="font-bold text-4xl my-8">{price}</h1>
      <p className="font-bold text-xs my-6">FEATURES:</p>
      {features.map((feature, index) => (
        <div className="flex items-center gap-1" key={index}>
          <IoCheckmarkCircleSharp color="#522182" size={28} />
          <h1 key={index}>{feature}</h1>
        </div>
      ))}

      <button className="rounded-md bg-black py-2 px-4 text-white mt-12 w-full">
        Subscribe
      </button>
    </div>
  );
};

export default PlansCard;
