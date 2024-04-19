import YoutubePlatformImg from "../../../../assets/svg/WorkerYoutubePlatformCard.svg";
import GooglePlatformImg from "../../../../assets/svg/WorkerGooglePlatformCard.svg";
import TiktokPlatformImg from "../../../../assets/svg/WorkerTikTokPlatformCard.svg";
import InstagramPlatformImg from "../../../../assets/svg/WorkerInstagramPlatformCard.svg";
import FacebookPlatformImg from "../../../../assets/svg/WorkerFacebookPlatformCard.svg";

// import HexagonalPlatform from "../../../../assets/svg/WorkerGooglePlatformCard.svg";
// import { Link } from "react-router-dom";

const WinningPlatformCard = ({ Title, Icon, Price }) => {
  let CardImgSource;

  // Determine CardImgSource based on the Icon prop
  switch (Icon) {
    case "youtube":
      CardImgSource = YoutubePlatformImg;
      break;
    case "google":
      CardImgSource = GooglePlatformImg;
      break;
    case "tiktok":
      CardImgSource = TiktokPlatformImg;
      break;
    case "instagram":
      CardImgSource = InstagramPlatformImg;
      break;

    case "facebook":
      CardImgSource = FacebookPlatformImg;
      break;
    default:
      CardImgSource = "";
  }

  return (
    // <div
    //   className="relative shadow-basic rounded-md w-[80%] -z-0 overflow-hidden h-[400px]"
    //   // style={{
    //   //   backgroundImage: `url(${HexagonalPlatform})`,
    //   //   backgroundRepeat: "no-repeat",
    //   // }}
    // >
    //   <h1 className="font-bold text-2xl px-4 mt-4">{Title}</h1>
    //   <img
    //     className="absolute md:scale-125 -z-10 mt-20"
    //     src={HexagonalPlatform}
    //   />

    //   <div className="absolute left-[41%] md:left-[40%] top-[37%] md:top-[29%] flex items-center  justify-center  z-50 ">
    //     <img className="size-16 md:size-20" src={CardImgSource} />
    //   </div>
    //   <div className="rounded-b-md  p-4 text-center text-2xl font-semibold text-white mt-[60%] md:mt-[50%]">
    //     <p className="py-4 text-lg ">
    //       You can earn from youtube by just watching videos.
    //     </p>
    //     <h1 className="text-2xl font-bold pb-10">{Price}</h1>
    //   </div>
    // </div>

    <div className="relative w-60 md:w-60 h-68 -z-0 overflow-hidden rounded-md bg-white shadow-basic ">
      <img
        className="absolute bottom-0 w-full  -z-10 mt-8"
        src={CardImgSource}
      />
      <h1 className="font-bold w-[100%] text-sm md:text-lg px-4 mt-2">
        {Title}
      </h1>

      <div className="rounded-b-md p-4 text-center text-2xl font-semibold text-white mt-[60%] md:mt-[50%]">
        {/* <p className="py-4 text-lg ">
          You can earn from youtube by just watching videos.
        </p> */}
        <h1 className="text-2xl font-semibold pb-10">{Price}</h1>
      </div>
    </div>
  );
};

export default WinningPlatformCard;
