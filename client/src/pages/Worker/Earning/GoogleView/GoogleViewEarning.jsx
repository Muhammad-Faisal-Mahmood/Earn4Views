import React, { useContext, useEffect, useState } from "react";
import EarningInstructions from "../../../../components/EarningInstructions";
import { UserContext } from "../../../../App";
import { fetchUserIpAddress } from "../../../../utils/FetchUsersIp";
import { Base_Api } from "../../../../utils/BaseApi";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import NoService from "../../../../components/NoService";

const GoogleViewEarning = () => {
  const { user, setUser } = useContext(UserContext);
  const [websiteData, setWesbiteData] = useState(null);
  const [noServicesAvailable, setNoServicesAvailable] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [nextButtonState, setNextButtonState] = useState(false);

  useEffect(() => {
    fetchWebsite();
    fetchUserIpAddress(setUser);
  }, []);

  const fetchWebsite = async () => {
    if (!user.ip) {
      fetchUserIpAddress(setUser);
    }
    try {
      const response = await fetch(Base_Api + "api/worker/GoogleViews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": user.authToken,
        },
        body: JSON.stringify({ IP_Address: user.ip }),
      });

      const data = await response.json();
      if (!data?.success && data?.service == 0) {
        setNoServicesAvailable(true);
        return;
      }
      setWesbiteData(data);
    } catch (error) {
      console.error("Error fetching  website:", error);
    }
  };


  const HandleGoogleViewEarning = async () => {
    if (!user.ip) {
      fetchUserIpAddress(setUser);
    }
    setNextButtonState(false);
    try {
      const response = await fetch(Base_Api + "api/worker/GoogleViewsEarn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": user.authToken,
        },
        body: JSON.stringify({
          IP_Address: user.ip,
          service_id: websiteData._id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        fetchWebsite();
        toast.info("Check out the new website");
      } else {
        toast.error(data.message);
        setNextButtonState(true);
      }
    } catch (error) {
      console.error("Error adding earning:", error);
    }
  };

  const startTimer = () => {
    setTimerStarted(true); 
    setNextButtonState(false);
    const timerId = setTimeout(() => {
      setNextButtonState(true);
      setTimerStarted(false); // Reset timer state after 1 minute
      toast.info("One minute has passed you can click on next to earn");
    }, 60000); // 60000 milliseconds is 1 minute

    // Optionally, clear the timer on component unmount to prevent leaks
    return () => clearTimeout(timerId);
  };

  console.log("website data: ", websiteData);
  const GoogleViewEarningInstructions = [
    { text: "Click button" },
    { text: "See website for 1 minute" },
    { text: "Earning will add" },
  ];
  return (
    <>
      <ToastContainer />
      <div className="mx-[7vw] flex flex-col gap-10 py-10 h-[100vh]">
        <EarningInstructions Instructions={GoogleViewEarningInstructions} />
        {websiteData && (
          <Link onClick={() => {
            if (!timerStarted) {
              startTimer(); // Start timer only if not already running
            }
          }} to={websiteData.URL} target="_blank" className="text-white two-color-gradient-background w-full text-3xl text-center font-bold rounded-md py-5">
            Visit Website
          </Link>
        )}
        {websiteData && (
          <button
          disabled={!nextButtonState}
            onClick={HandleGoogleViewEarning}
            className="text-[#532283] border-2 border-[#521E5B] w-full text-3xl font-bold rounded-md py-5"
          >
            Next
          </button>
        )}
        {noServicesAvailable && <NoService/>}
      </div>
    </>
  );
};

export default GoogleViewEarning;
