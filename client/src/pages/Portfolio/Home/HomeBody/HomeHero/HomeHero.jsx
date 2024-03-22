import HomeHeroImg from "../../../../../assets/img/HomeHeroImg.svg";

const HomeHero = () => {
  return (
    <div className="flex h-[100vh] overflow-hidden">
      <div className="w-[40%] items-center flex">
        <div className="pl-20 flex gap-6 flex-col">
          <h1 className="text-3xl font-bold">THE POWER OF EARN 4 VIEWS</h1>
          <h1 className="text-3xl font-bold">
            Grow beyond yourself professionally by increasing followers and
            likes on your social accounts.
          </h1>
          <button className="gradient-background-horizontal py-3 px-6 text-white rounded-md w-fit font-bold">
            Start working
          </button>
        </div>
      </div>
      <div className="w-[65%]">
        <img className="" src={HomeHeroImg} />
      </div>
    </div>
  );
};

export default HomeHero;
