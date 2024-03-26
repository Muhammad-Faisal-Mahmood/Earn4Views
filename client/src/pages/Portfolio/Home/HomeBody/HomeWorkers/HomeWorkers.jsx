import React from "react";
import HomeWorkerEarningCard from "./HomeWorkerEarningCard";

const HomeWorkers = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="uppercase text-4xl">workers</h1>
        <p className="font-medium text-xl mt-4 mb-10 ">
          Our workers earn from different platforms to give you likes, followers
          and subscribers.
        </p>
      </div>
      <div className="my-10  flex flex-col gap-y-5  overflow-scroll no-scrollbar p-3 h-[85vh]  xl:h-[47vh] lg:my-20 lg:mx-40">
        <HomeWorkerEarningCard />
        <HomeWorkerEarningCard />
        <HomeWorkerEarningCard />
        <HomeWorkerEarningCard />
        <HomeWorkerEarningCard />
      </div>
    </div>
  );
};

export default HomeWorkers;
