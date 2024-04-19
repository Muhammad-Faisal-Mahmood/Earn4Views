import UserAvatar from "../../../../../assets/svg/HomeWorkerAvatar.svg";

const HomeWorkerEarningCard = ({ card }) => {
  return (
    <div className="rounded-md flex justify-between px-1 md:px-5 py-2 shadow-basic lg:px-10">
      <div className="flex gap-x-2 w-[50%]  items-center">
        {/* <img src={UserAvatar} className="size-9 md:size-12" /> */}
        <h1 className="font-bold text-[10px] md:text-lg">{card.name}</h1>
      </div>
      <div className="flex gap-x-2  w-[25%] items-center">
        <img className="w-8 lg:w-12" src={card.img} />
        <h1 className="text-[10px] md:text-md md:text-lg">{card.channel}</h1>
      </div>
      <div className="flex gap-x-2 items-center ml-10 sm:ml-0">
        <p className="font-bold text-[10px]  md:text-lg">
          Earnings:{" "}
          <span className=" ml-1 font-normal lg:ml-2">${card.earning}</span>
        </p>
      </div>
    </div>
  );
};

export default HomeWorkerEarningCard;
