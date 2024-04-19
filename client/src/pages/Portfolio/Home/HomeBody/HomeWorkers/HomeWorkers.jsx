import HomeWorkerEarningCard from "./HomeWorkerEarningCard";
import Youtube from "../../../../../assets/svg/YoutubePlatformImg.svg";
import TikTok from "../../../../../assets/svg/TiktokPlatformImg.svg";
import Google from "../../../../../assets/svg/GooglePlatformImg.svg";
import Instagram from "../../../../../assets/svg/InstagramPlatformImg.svg";
import Facebook from "../../../../../assets/svg/FacebookPlatformImg.svg";

const HomeWorkers = () => {
  const Data=[
    {
      "name": "Sohaib Shoukat",
      "channel": "Youtube",
      "earning": "550",
      img:Youtube
    },
    {
      "name": "Inzamam Yousaf",
      "channel": "Google",
      "earning": "200",
      img:Google
    },
    {
      "name": "Afaf Kainat",
      "channel": "Instagram",
      "earning": "640",
      img:Instagram
    },
    {
      "name": "Aroosha Ali",
      "channel": "Youtube",
      "earning": "540",
      img:Youtube
    },
    {
      "name": "Rabi Ali",
      "channel": "Facebook",
      "earning": "1000",
      img:Facebook
    },
    {
      "name": "Ahmed Ali",
      "channel": "TikTok",
      "earning": "230",
      img:TikTok
    }
  ]
  return (
    <div>
      <div className="text-center">
        <h1 className="uppercase text-4xl">workers</h1>
        <p className="font-medium text-xl mt-4 mb-10 ">
          Our workers earn from different platforms to give you likes, followers
          and subscribers.
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-5  overflow-scroll no-scrollbar p-3 h-[40vh]  xl:h-[47vh] lg:my-20 lg:mx-40">
        {Data.map((item,index)=>(
          <HomeWorkerEarningCard card={item} key={index} />
        ))}
        {/* <HomeWorkerEarningCard />
        <HomeWorkerEarningCard />
        <HomeWorkerEarningCard />
        <HomeWorkerEarningCard /> */}
      </div>
    </div>
  );
};

export default HomeWorkers;
