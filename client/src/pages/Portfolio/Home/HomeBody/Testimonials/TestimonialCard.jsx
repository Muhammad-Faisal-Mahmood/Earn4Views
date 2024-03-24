import avatar from "../../../../../assets/svg/HomeWorkerAvatar.svg";
import { IoStar } from "react-icons/io5";

const TestimonialCard = () => {
  return (
    <div className="rounded-lg p-4 shadow-small md:w-[30%]">
      <div className="flex gap-2">
        <div className="size-10">
          <img src={avatar} alt="" />
        </div>
        <div>
          <p className="text-sm font-bold">Alex Adamatz</p>
          <p className="text-xs ">Eigentumar</p>
        </div>
      </div>
      <div className="flex my-4 gap-1">
        <IoStar color="#E6BE32" />
        <IoStar color="#E6BE32" />
        <IoStar color="#E6BE32" />
        <IoStar color="#E6BE32" />
        <IoStar color="#E6BE32" />
      </div>
      <div className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab repellat
        voluptatibus possimus aspernatur, illum debitis cum ratione illo in
        libero nulla molestias cumque corrupti asperiores repudiandae incidunt
        necessitatibus consequuntur, neque doloremque quia quasi nobis!
        Repellendus odit pariatur recusandae asperiores officia consectetur
        dolorem, at labore veritatis numquam adipisci illo autem eius.
      </div>
    </div>
  );
};

export default TestimonialCard;
