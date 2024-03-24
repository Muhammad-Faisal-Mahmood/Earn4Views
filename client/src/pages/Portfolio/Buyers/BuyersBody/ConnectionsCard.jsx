import React from "react";
import buyerConnectionsImg from "../../../../assets/svg/buyerConnectionsImg.svg";

const ConnectionsCard = ({
  ConnectionName,
  ConnectionJobTitle,
  ConnectionFollowerCount,
}) => {
  return (
    <div className="px-5 pt-5 pb-10 shadow-basic rounded-md">
      <div>
        <img className="rounded-sm" src={buyerConnectionsImg} />
      </div>
      <h1 className="font-bold py-2 text-center">{ConnectionName}</h1>
      <h1 className="text-center">{ConnectionJobTitle}</h1>
      <div className="flex justify-between mt-4">
        <h1 className="font-bold text-sm">Current Subscribers</h1>
        <h1 className="text-sm">{ConnectionFollowerCount}</h1>
      </div>
    </div>
  );
};

export default ConnectionsCard;
