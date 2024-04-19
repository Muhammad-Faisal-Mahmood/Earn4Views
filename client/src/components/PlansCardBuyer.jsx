import PropTypes from "prop-types";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const PlansCardBuyer = ({ title, price, features }) => {
  // Prop validation using PropTypes
  PlansCardBuyer.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  return (
    <div className="border-2 p-4  rounded-lg w-full">
      <h1 className="text-center font-bold">{title}</h1>
      <h1 className="font-bold text-3xl my-4">{price}</h1>
      <p className="font-bold text-xs my-4">FEATURES:</p>
      {features.map((feature, index) => (
        <div className="flex items-center gap-1" key={index}>
          <IoCheckmarkCircleSharp color="#522182" size={28} />
          <h1 key={index}>{feature}</h1>
        </div>
      ))}
      <Link to={"/dashboard/buyer/new-services"}>
        <button className="rounded-md bg-black py-2 mt-4 px-4 text-white w-full">
          Subscribe
        </button>
      </Link>
    </div>
  );
};

export default PlansCardBuyer;
