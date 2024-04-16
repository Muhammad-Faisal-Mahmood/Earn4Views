import PositionCard from "../../../components/PositionCard";
import contactCall from "../../../assets/svg/contact-call.svg";
import InstagamLogo from "../../../assets/svg/InstagramPlatformImg.svg";
import YoutubeLogo from "../../../assets/svg/YoutubePlatformImg.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { IoClose, IoMailOutline } from "react-icons/io5";
import jazzcashPaymentMethod from "../../../assets/svg/jazzcashPaymentMethod.svg";
import { Base_Api } from "../../../utils/BaseApi";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../../App";
import { Link } from "react-router-dom";
import Steps from "./Steps";

const BuyerDashNewServices = () => {
  const [step, setStep] = useState(1);
  const [thankyouModal, setThankyouModal] = useState(null);
  const [selectedPlatformPlans, setSelectedPlatformPlans] = useState(null);
  const [plans, setPlans] = useState(null);
  const [buyer, setBuyer] = useState(null);
  const [payNow, setPayNow] = useState(false);
  const [optionNotSelected, setOptionNotSelected] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { user } = useContext(UserContext);
  const urlRef = useRef(null);

  useEffect(() => {
    fetchPlans();
    fetchBuyer();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(Base_Api + "api/buyer/getPlans", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        // console.log(data);
        setPlans(data.plan);
      } else if (!data.success) {
        toast.error("Error getting plans");
      }
    } catch (error) {
      console.log("ERR: loading plans in services");
      // Handle error state here if needed
    }
  };

  const fetchBuyer = async () => {
    try {
      const response = await fetch(Base_Api + "api/buyer/getBuyer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": user.authToken,
        },
      });
      const data = await response.json();
      if (data.success) {
        // console.log(data);
        setBuyer(data.buyer);
        console.log("Data buyer", data.buyer);
      } else if (!data.success) {
        toast.error("Error getting plans");
      }
    } catch (error) {
      console.log("ERR: loading plans in services");
      // Handle error state here if needed
    }
  };

  const createService = async () => {
    try {
      // console.log("api call create service");
      const response = await fetch(Base_Api + "api/buyer/createService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": user.authToken,
        },
        body: JSON.stringify({
          Channel: selectedPlatformPlans[0].Channel,
          Servicetaken: selectedService.Service,
          Amount: buyer?.Funds,
          // Amount: 100,
          URL: urlRef?.current,
          Total: selectedService?.Price * 100,
          // Total: 0,
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log(data);
        setThankyouModal(true);

        return true;
      } else if (!data.success) {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      console.log("Error in catch: ", error);
      toast.error(error.message);
      return false;
      // Handle error state here if needed
    }
  };

  const channels = [...new Set(plans?.map((plan) => plan.Channel))];

  const platforms = [];

  channels.map((channel) => {
    if (channel === "Youtube") {
      platforms.push({
        img: YoutubeLogo,
        name: "Youtube",
      });
    } else if (channel === "Instagram") {
      platforms.push({
        img: InstagamLogo,
        name: "Instagram",
      });
    }
  });

  const isValidUrl = (url) => {
    const urlRegex =
      /^((https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?)|(www\.[\da-z.-]+\.[a-z.]{2,6})$/;
    return urlRegex.test(url);
  };

  // const selectedPlatformServices = plans?.map(
  //   (plan) => plan?.Channel === selectedPlatform && plan.Service
  // );

  // let selectedPlatformServicePrice;

  // console.log("Selected Platform Services: ", selectedPlatformServices);

  const stepOne = (
    <>
      <div className="my-2 h-96 custom-scrollbar overflow-y-scroll p-8">
        <div className="grid-cols-1 lg:grid-cols-2 grid gap-4 justify-center">
          {platforms.map((platform, index) => (
            <div
              onClick={() => {
                const selectedPlatformData = plans.filter(
                  (plan) => plan.Channel === platform.name
                );
                setSelectedPlatformPlans(selectedPlatformData);
              }}
              key={index}
              className={
                selectedPlatformPlans &&
                selectedPlatformPlans[0]?.Channel === platform.name
                  ? "shadow-basic h-fit px-8 py-4 rounded-xl text-center font-bold border-black border-4 flex flex-col items-center"
                  : "shadow-basic h-fit px-8 py-4 rounded-xl text-center font-bold flex flex-col items-center "
              }
            >
              <img src={platform.img} className="size-20" alt="" />
              <h1>{platform.name}</h1>
            </div>
          ))}
        </div>
      </div>
      {optionNotSelected && (
        <h1 className="text-red-600 font-semibold p-2">
          * Please select a platform
        </h1>
      )}
      <div className="w-full flex justify-center">
        <button
          onClick={() => {
            !selectedPlatformPlans && setOptionNotSelected(true);
            selectedPlatformPlans && setStep(step + 1);
          }}
          className=" px-16 md:w-full button-gradient-background text-white py-2 md:py-4 font-bold text-2xl rounded-md"
        >
          Next
        </button>
      </div>
    </>
  );

  const stepTwo = (
    <>
      <div className="my-2 px-4 py-8 md:p-8 flex flex-col gap-4">
        <div className="flex-col flex gap-1">
          <h1>Platform</h1>
          <select
            value={selectedService?.value}
            onChange={(e) => {
              setSelectedService(
                selectedPlatformPlans?.filter(
                  (plan) => plan.Service === e.target.value
                )[0]
              );
            }}
            className="bg-white shadow-basic p-3 w-full"
          >
            <option value="">Select a value</option>
            {selectedPlatformPlans &&
              selectedPlatformPlans?.map((plan, index) => (
                <option key={index} value={`${plan.Service}`}>
                  {plan.Service}
                </option>
              ))}
          </select>
        </div>
        <div className="flex-col flex gap-1">
          <h1>Amount</h1>
          <h1 className="p-2 w-full h-12 shadow-basic">
            {selectedService ? `$${selectedService?.Price * 100}` : `$0`}
          </h1>
          {/* <select
            value={"werwe"}
            // onChange={(e) => setSelectedOption(e.target.value)}
            className="bg-white shadow-basic p-3 w-full"
          >
            <option value="">Select an option</option>
            <option value="youtubeLikes">10k</option>
            <option value="instagramFollower">20k</option>
          </select> */}
        </div>
        <div className="flex-col flex gap-1">
          <h1>URL:</h1>
          <textarea
            value={urlRef.current}
            onChange={(e) => (urlRef.current = e.target.value)}
            cols={60}
            rows={2}
            className="bg-white rounded-sm shadow-basic p-2 text-xs outline-none"
            placeholder="Example: https://www.access2interpreters.com/the-history-of-thank-you-around-the-world/"
          />
        </div>
      </div>
      <button
        onClick={() => {
          isValidUrl(urlRef.current)
            ? setStep(step + 1)
            : toast.warning("Enter valid url");
        }}
        className="w-full button-gradient-background text-white py-4 font-bold text-2xl rounded-sm"
      >
        Pay Now
      </button>
    </>
  );

  const stepThree = (
    <div>
      <div className="flex justify-between my-8">
        <h1 className="font-bold">Total Amount:</h1>
        <h1 className="font-semibold ">{buyer?.Funds || 0}</h1>
      </div>
      <Link to={"/dashboard/buyer/transactions"} className="">
        <div className="  border-4 font-bold text-purple-950 border-purple-950 w-full p-4 my-2">
          Add Funds
        </div>
      </Link>

      <div className="flex justify-between mt-4 mb-8">
        <h1 className="font-bold">Total Amount:</h1>
        <h1 className="font-semibold">${selectedService?.Price * 100}</h1>
      </div>

      <button
        onClick={() => {
          createService();
        }}
        className="w-full button-gradient-background text-white py-4 font-bold text-2xl rounded-md"
      >
        Pay Now
      </button>
    </div>
  );

  const payNowJSX = (
    <div className="flex flex-col gap-8 py-4">
      <div>
        <h1>TID:</h1>
        <input
          type="text"
          className="bg-white shadow-md rounded-sm"
          placeholder="Example: #12345"
        />
      </div>
      <div className="py-8 px-4 shadow-basic flex items-center gap-4 rounded-md">
        <img src={jazzcashPaymentMethod} alt="" />
        <div>
          <h1>Jazz cash</h1>
          <h1>**** **** **** 4002</h1>
          <h1>Expiry on 20/2024</h1>
          <div className="flex items-center gap-1">
            <IoMailOutline />
            billing@acme.corp
          </div>
        </div>
        <div>
          <button>Change</button>
        </div>
      </div>
      <button
        onClick={() => {
          setThankyouModal(true);
        }}
        className="w-full button-gradient-background text-white py-4 font-bold text-2xl rounded-sm"
      >
        Submit
      </button>
    </div>
  );

  return (
    <>
      <ToastContainer />

      <div className="md:hidden">
        <Steps step={step} />
      </div>
      <div className="py-4 md:py-20">
        <div className="shadow-basic bg-white mx-3 md:mx-8 lg:mx-20 py-8 md:py-12 lg:py-20 px-4 md:px-10 rounded-2xl flex gap-10">
          <div className="w-full md:w-[45%]">
            <div className="flex flex-col gap-3  mb-8 md:mb-16 text-center md:text-left">
              <h1 className="text-xl md:text-3xl font-bold">
                Let us know your concerns.
              </h1>
              <p className="text-sm md:text-xl text-gray-500">
                First please give us some context.
              </p>
            </div>
            <div className="border-t-2 border-gray-400" />
            {!payNow && (
              <div>
                {step === 1 ? stepOne : step === 2 ? stepTwo : stepThree}
              </div>
            )}

            {payNow && payNowJSX}
          </div>
          <div className="hidden md:flex w-[55%]  flex-col lg:gap-28 gap-12">
            <div className="flex flex-col gap-12">
              <h1 className="text-2xl font-bold my-4">3 steps to solutions</h1>
              <div className="flex gap-2">
                <PositionCard
                  gradient={step}
                  stepNumber={1}
                  text={"Fill out the support form"}
                />
                <PositionCard
                  gradient={step}
                  stepNumber={2}
                  text={"You wait, we'll get started"}
                />
                <PositionCard
                  gradient={step}
                  stepNumber={3}
                  text={"Get your solution"}
                />
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
          <div className="w-[90%] md:w-[40%] opacity-50-bg rounded-md p-4 pb-16 ">
            <div
              onClick={() => setThankyouModal(0)}
              className="text-white w-full justify-end p-2 cursor-pointer flex "
            >
              <IoClose size={26} />
            </div>

            <div className="text-white items-center flex flex-col gap-10 justify-center">
              <h1 className="text-2xl md:text-5xl text-white">Thank You</h1>
              <p className="text-xl md:text-lg text-white">
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
