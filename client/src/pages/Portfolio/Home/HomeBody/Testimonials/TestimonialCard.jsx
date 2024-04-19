import avatar from "../../../../../assets/svg/HomeWorkerAvatar.svg";
import { IoStar } from "react-icons/io5";

const TestimonialCard = ({card}) => {
  return (
    <div className="rounded-lg p-4 shadow-small lg:w-[30%] w-full  my-2">
      <div className="flex gap-2">
        <div className="size-10">
          <img src={avatar} alt="" />
        </div>
        <div>
          <p className="text-sm font-bold">{card.name}</p>
          {/* <p className="text-xs ">{card.d}</p> */}
        </div>
      </div>
      <div className="flex my-4 gap-1">
        <IoStar color="#E6BE32" />
        <IoStar color="#E6BE32" />
        <IoStar color="#E6BE32" />
        <IoStar color="#E6BE32" />
        <IoStar color="#E6BE32" />
      </div>
      <div className="text-sm ">
        {card.description}
      </div>
    </div>
  );
};

export default TestimonialCard;
