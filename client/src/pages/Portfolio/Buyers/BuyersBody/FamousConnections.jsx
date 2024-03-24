import React from "react";
import ConnectionsCard from "./ConnectionsCard";

const FamousConnections = () => {
  return (
    <div className="my-24  flex flex-col items-center ">
      <div className="text-center mx-auto w-[55%]">
        <h1 className="text-5xl font-bold">Famous Connections</h1>
        <p className="text-center font-light text-2xl my-8">
          Many famous people connected with our platform and get their views,
          likes and maximum subscribers .
        </p>
      </div>
      <div className="grid grid-cols-3 gap-y-10 gap-x-16">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((keys, index) => (
          <ConnectionsCard
            key={index}
            ConnectionName={"Alex Adamatz"}
            ConnectionJobTitle={"Youtuber"}
            ConnectionFollowerCount={"500k"}
          />
        ))}
      </div>
    </div>
  );
};

export default FamousConnections;
