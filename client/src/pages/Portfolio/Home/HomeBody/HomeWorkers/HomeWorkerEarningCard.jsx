import UserAvatar from "../../../../../assets/svg/HomeWorkerAvatar.svg";
import YoutubeIcon from "../../../../../assets/svg/YoutubePlatformImg.svg";

const HomeWorkerEarningCard = () => {
  return (
    <div className="rounded-md flex  justify-between px-10  py-2 shadow-basic">
      <div className="flex gap-x-2 items-center">
        <img src={UserAvatar} />
        <h1 className="font-bold">Alex Adamatz</h1>
      </div>
      <div className="flex  items-center">
        <img className="w-12" src={YoutubeIcon} />
        <h1>Youtube</h1>
      </div>
      <div className="flex gap-x-2 items-center">
        <p className="font-bold">
          Earnings: <span className="ml-2 font-normal">$200k</span>
        </p>
      </div>
    </div>
  );
};

export default HomeWorkerEarningCard;
