import YoutubePlatformImg from "../../../../assets/svg/YoutubePlatformImg.svg";
import HexagonalPlatform from "../../../../assets/svg/hexagonalplatform.svg";

const WinningPlatformCard = () => {
  return (
    <div
      className="relative shadow-basic rounded-md w-[80%] -z-50 overflow-hidden h-[400px]"
      // style={{
      //   backgroundImage: `url(${HexagonalPlatform})`,
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <h1 className="font-bold text-2xl px-4 mt-4">Youtube Views</h1>
      <img className="absolute scale-125 -z-10 mt-20" src={HexagonalPlatform} />

      <div className="absolute left-[33%] top-[30%] flex items-center  justify-center  z-50 ">
        <img className=" w-[70%]" src={YoutubePlatformImg} />
      </div>
      <div className="rounded-b-md  p-4 text-center text-2xl font-semibold text-white mt-[50%]">
        <p className="py-4 text-lg ">
          You can earn from youtube by just watching videos.
        </p>
        <h1 className="text-2xl font-bold pb-10">200$</h1>
      </div>
    </div>
  );
};

export default WinningPlatformCard;
