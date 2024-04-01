import PositionCard from "../../../components/PositionCard";
import contactCall from "../../../assets/svg/contact-call.svg";
import InstargramLogo from "../../../assets/svg/InstagramPlatformImg.svg";
import YoutubeLogo from "../../../assets/svg/YoutubePlatformImg.svg";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const BuyerDashNewServices = () => {
  const [step, setStep] = useState(1);
  const [thankyouModal, setThankyouModal] = useState(0);

  const stepOne = (
    <div className="my-2 h-96 custom-scrollbar overflow-y-scroll p-8">
      <div className="flex h-[700px] gap-4 justify-center">
        <div className="shadow-basic h-fit px-8 py-4 rounded-xl text-center font-bold">
          <img src={YoutubeLogo} className="size-20" alt="" />
          Youtube
        </div>
        <div className="shadow-basic h-fit px-8 py-4 rounded-xl text-center font-bold">
          <img src={InstargramLogo} className="size-20" alt="" />
          Instagram
        </div>
      </div>
    </div>
  );

  const stepTwo = (
    <div className="my-2 p-8">
      <div>
        <h1>Platform</h1>
        <input
          type="text"
          className=" bg-white shadow-basic rounded-sm"
          placeholder="Youtube Likes"
        />
      </div>
      <div>
        <h1>Amount</h1>
        <input
          type="text"
          className=" bg-white shadow-basic rounded-sm"
          placeholder="10k"
        />
      </div>
      <h1>URL:</h1>
      <div className="bg-white rounded-sm shadow-basic p-2 text-xs text-neutral-400">
        Example:
        https://www.access2interpreters.com/the-history-of-thank-you-around-the-world/
      </div>
    </div>
  );

  const stepThree = (
    <div>
      <div className="flex justify-between my-8">
        <h1 className="font-bold">Total Amount:</h1>
        <h1 className="font-semibold">0</h1>
      </div>
      <div>
        <button className="border-4 font-bold text-purple-950 border-purple-950 w-full p-4 my-2">
          Add Funds
        </button>
      </div>

      <div className="flex justify-between mt-4 mb-8">
        <h1 className="font-bold">Total Amount:</h1>
        <h1 className="font-semibold">20k</h1>
      </div>
    </div>
  );

  return (
    <>
      <div className=" py-20">
        <div className="shadow-basic bg-white mx-4 md:mx-8 lg:mx-20 py-8 md:py-12 lg:py-20 px-8 md:px-10 rounded-2xl flex gap-10">
          <div className="w-full md:w-[45%]">
            <div className="flex flex-col gap-3 mb-16">
              <h1 className="text-xl md:text-3xl font-bold">
                Let us know your concerns.
              </h1>
              <p className="text-xl md:text-xl text-gray-500">
                First please give us some context.
              </p>
            </div>
            <div className="border-t-2 border-gray-400" />
            {step === 1 ? stepOne : step === 2 ? stepTwo : stepThree}
            <div>
              <button
                onClick={() =>
                  step < 3 ? setStep(step + 1) : setThankyouModal(1)
                }
                className="w-full button-gradient-background text-white py-4 font-bold text-2xl rounded-sm"
              >
                {step == 1 ? "Next" : "Pay Now"}
              </button>
            </div>
          </div>
          <div className="hidden md:flex w-[55%]  flex-col lg:gap-28 gap-12">
            <div className="flex flex-col gap-12">
              <h1 className="text-2xl font-bold my-4">3 steps to solutions</h1>
              <div className="flex gap-2">
                <PositionCard
                  gradient={true}
                  stepNumber={"01"}
                  text={"Fill out the support form"}
                />
                <PositionCard
                  stepNumber={"02"}
                  text={"You wait, we'll get started"}
                />
                <PositionCard stepNumber={"03"} text={"Get your solution"} />
              </div>
            </div>
            <div className="shadow-basic p-8 pb-12 flex rounded-lg relative">
              <div className="w-[50%] lg:w-[70%] flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Special Request?</h1>
                <p className="text-xl">
                  Is your page not accessible or is displayed completely
                  incorrectly? Then call us directly!
                </p>
              </div>
              <div>
                <img className="absolute bottom-0" src={contactCall} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {thankyouModal && (
        <div className="fixed top-0 left-0  w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className=" w-[40%] opacity-50-bg rounded-md p-4 pb-16 ">
            <div
              onClick={() => setThankyouModal(0)}
              className="text-white w-full justify-end p-2 cursor-pointer flex "
            >
              <IoClose size={26} />
            </div>

            <div className="text-white items-center flex flex-col gap-10 justify-center">
              <h1 className="text-5xl text-white">Thank You</h1>
              <p className="text-lg text-white">
                You can See your service status
              </p>
              <button className="p-4 w-fit rounded-lg bg-white text-black font-bold">
                Check Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyerDashNewServices;
