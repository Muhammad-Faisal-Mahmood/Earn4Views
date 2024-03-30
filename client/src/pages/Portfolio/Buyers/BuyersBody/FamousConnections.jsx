import ConnectionsCard from "./ConnectionsCard";
import ConnectionsCardMobile from "./ConnectionsCardMobile";

const FamousConnections = () => {
  return (
    <div className=" my-10 flex flex-col items-center lg:my-24">
      <div className="text-center  lg:w-[55%]">
        <h1 className="text-2xl font-bold lg:text-5xl">Famous Connections</h1>
        <p className=" font-light mt-4 mb-10 mx-10 text-lg lg:mx-0 lg:my-8 lg:text-2xl">
          Many famous people connected with our platform and get their views,
          likes and maximum subscribers .
        </p>
      </div>
      <div className="hidden md:grid grid-cols-3 gap-y-10 gap-x-16">
        {[1, 2, 3, 4, 5, 6].map((keys, index) => (
          <ConnectionsCard
            key={index}
            ConnectionName={"Alex Adamatz"}
            ConnectionJobTitle={"Youtuber"}
            ConnectionFollowerCount={"500k"}
          />
        ))}
      </div>
      <div className="md:hidden flex flex-col items-center gap-4">
        <ConnectionsCardMobile />
        <div className="flex gap-4">
          <ConnectionsCardMobile />
          <ConnectionsCardMobile />
        </div>
      </div>
    </div>
  );
};

export default FamousConnections;
