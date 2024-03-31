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
      className="relative shadow-basic rounded-md w-[80%] -z-0 overflow-hidden h-[400px]"
      // style={{
      //   backgroundImage: `url(${HexagonalPlatform})`,
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <h1 className="font-bold text-2xl px-4 mt-4">{Title}</h1>
      <img
        className="absolute md:scale-125 -z-10 mt-20"
        src={HexagonalPlatform}
      />

      <div className="absolute left-[41%] md:left-[40%] top-[37%] md:top-[29%] flex items-center  justify-center  z-50 ">
        <img className="size-16 md:size-20" src={CardImgSource} />
      </div>
      <div className="rounded-b-md  p-4 text-center text-2xl font-semibold text-white mt-[60%] md:mt-[50%]">
        <p className="py-4 text-lg ">
          You can earn from youtube by just watching videos.
        </p>
        <h1 className="text-2xl font-bold pb-10">200$</h1>
      </div>
    </div>
  );
};

export default WinningPlatformCard;
