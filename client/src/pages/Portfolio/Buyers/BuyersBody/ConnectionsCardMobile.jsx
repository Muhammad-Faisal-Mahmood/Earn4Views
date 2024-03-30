import buyerConnectionsImg from "../../../../assets/svg/buyerConnectionsImg.svg";
import YoutubePlatformImg from "../../../../assets/svg/YoutubePlatformImg.svg";

const ConnectionsCardMobile = () => {
  return (
    <div className="shadow-basic w-fit rounded-lg p-2 pr-4 flex gap-4 items-center">
      <img
        className=" rounded-md w-14 h-14 bg-red-600 object-cover"
        src={buyerConnectionsImg}
      />
      <div>
        <h1 className="text-xs font-semibold">Alex Adamatz</h1>
        <p className="text-[8px]">Eigentumar</p>
        <div className="flex items-center">
          <img className="w-5 mr-1" src={YoutubePlatformImg} />
          <p className="text-xs font-semibold">Youtube</p>
        </div>
        <h1 className="text-xs font-semibold">$200k</h1>
      </div>
    </div>
  );
};

export default ConnectionsCardMobile;
