import React, { useContext, useEffect, useState } from "react";
import EarningInstructions from "../../../../components/EarningInstructions";
import { Base_Api } from "../../../../utils/BaseApi";
import { UserContext } from "../../../../App";
import getYouTubeID from "get-youtube-id";
import { ToastContainer, toast } from "react-toastify";
import { fetchUserIpAddress } from "../../../../utils/FetchUsersIp";

const YoutubeViewEarning = () => {
  const { user,setUser } = useContext(UserContext);
  const [videoData, setVideoData] = useState(null);
  const [noServicesAvailable, setNoServicesAvailable] = useState(false);

  useEffect(() => {
    fetchYoutubeVideo();
    fetchUserIpAddress(setUser);
  }, []);

  const fetchYoutubeVideo = async () => {
    if(!user.ip){
      fetchUserIpAddress(setUser);
    }
    try {
      const response = await fetch(Base_Api + "api/worker/YoutubeView", {
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
      setVideoData(data);
    } catch (error) {
      console.error("Error fetching YouTube video:", error);
    }
  };
  
  const HandleYoutubeViewEarning = async () => {
    if(!user.ip){
      fetchUserIpAddress(setUser);
    }
    try {
      const response = await fetch(Base_Api + "api/worker/YoutubeViewEarn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": user.authToken,
        },
        body: JSON.stringify({
          IP_Address: user.ip,
          service_id: videoData._id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        fetchYoutubeVideo();
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding earning:", error);
    }
  };
  const urlkey = getYouTubeID(videoData?.URL);
  const YoutubeViewEarningInstructions = [
    { text: "3 Minute Watch video" },
    { text: "Click Next" },
    { text: "Earning will add" },
  ];

  return (
    <>
      <ToastContainer />
      <div className="mx-[7vw] flex flex-col gap-12 py-10 h-[100vh]">
        <EarningInstructions Instructions={YoutubeViewEarningInstructions} />
        {urlkey && (
          <div className="w-full h-[50vh] bg-[#E3E1E1] rounded-lg flex items-center justify-center">
            <iframe
              width={"100%"}
              height={"100%"}
              src={`https://www.youtube.com/embed/${urlkey}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        )}
        {urlkey && (
          <div className="flex items-center justify-center">
            <button
              onClick={HandleYoutubeViewEarning}
              className="two-color-gradient-background-vertical text-white px-16  font-bold py-4 rounded-md text-xl md:text-2xl lg:text-3xl"
            >
              Next
            </button>
          </div>
        )}
        {noServicesAvailable && (
          <div>
            <h1 className="text-xl font-medium">
              No Services available at the moment. Try again later..
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default YoutubeViewEarning;
