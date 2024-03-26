import YoutubePlatformImg from "../../../../assets/svg/YoutubePlatformImg.svg";
import TiktokPlatformImg from "../../../../assets/svg/TiktokPlatformImg.svg";
import InstagramPlatformImg from "../../../../assets/svg/InstagramPlatformImg.svg";
import GooglePlatformImg from "../../../../assets/svg/GooglePlatformImg.svg";
import FacebookPlatformImg from "../../../../assets/svg/FacebookPlatformImg.svg";

import HexagonalPlatform from "../../../../assets/svg/hexagonalplatform.svg";

const WinningPlatformCard = ({ Title, Icon }) => {
  let CardImgSource;

  // Determine CardImgSource based on the Icon prop
  switch (Icon) {
    case "youtube":
      CardImgSource = YoutubePlatformImg;
      break;
    case "tiktok":
      CardImgSource = TiktokPlatformImg;
      break;
    case "instagram":
      CardImgSource = InstagramPlatformImg;
      break;
    case "google":
      CardImgSource = GooglePlatformImg;
      break;
    case "facebook":
      CardImgSource = FacebookPlatformImg;
      break;
    default:
      CardImgSource = "";
  }

  return (
    <div
      className="relative shadow-basic rounded-md w-[80%] -z-50 overflow-hidden h-[400px]"
      // style={{
      //   backgroundImage: `url(${HexagonalPlatform})`,
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <h1 className="font-bold text-2xl px-4 mt-4">{Title}</h1>
      <img className="absolute scale-125 -z-10 mt-20" src={HexagonalPlatform} />

      <div className="absolute left-[30%] top-[29%] flex items-center  justify-center  z-50 sm:left-[33%] sm:top-[30%] md:left-[31%] md:top-[29%] lg:left-[28%] xl:left-[33%] xl:top-[30%]">
        <img className=" w-[70%] lg:w-[65%] xl:w-[70%]" src={CardImgSource} />
      </div>
      <div className="rounded-b-md  p-4 text-center text-2xl font-semibold text-white mt-[50%] ">
        <p className="py-4 text-lg ">
          You can earn from youtube by just watching videos.
        </p>
        <h1 className="text-2xl font-bold pb-10">200$</h1>
      </div>
    </div>
  );
};

export default WinningPlatformCard;
