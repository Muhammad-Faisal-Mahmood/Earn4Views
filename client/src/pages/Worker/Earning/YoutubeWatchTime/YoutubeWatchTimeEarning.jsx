import React, { useContext, useEffect, useRef, useState } from "react";
import EarningInstructions from "../../../../components/EarningInstructions";
import { UserContext } from "../../../../App";
import { fetchUserIpAddress } from "../../../../utils/FetchUsersIp";
import { Base_Api } from "../../../../utils/BaseApi";
import getYouTubeID from "get-youtube-id";
import { ToastContainer, toast } from "react-toastify";
import { secondsToMinutes } from "../../../../utils/SecondMintue";

const YoutubeWatchTimeEarning = () => {
  const { user, setUser } = useContext(UserContext);
  const [videoData, setVideoData] = useState(null);
  const [VideoPlayed, setVideoPlayed] = useState(false);
  const [noServicesAvailable, setNoServicesAvailable] = useState(false);

  const [VideoPlay, setVideoPlay] = useState(false)
  const [WatchedTime, setWatchedTime] = useState(null)

  const [urlKey, seturlKey] = useState(null);

  useEffect(() => {
    if(user){
      fetchYoutubeVideo();
      fetchUserIpAddress(setUser);
    }
  }, []);

  const fetchYoutubeVideo = async () => {
    setVideoPlay(false)
    if (!user.ip) {
      fetchUserIpAddress(setUser);
    }
    setVideoPlayed(false);
    try {
      const response = await fetch(Base_Api + "api/worker/YoutubeWatchTime", {
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
      seturlKey(getYouTubeID(data?.URL));
      let url = getYouTubeID(data?.URL);
      // playerRef.current = new YT.Player('youtube-player', {
      //   height: '360',
      //   width: '640',
      //   videoId: url,
      //   playerVars: {
      //     autoplay: 1,    // Autoplay
      //     controls: 0,    // Hide controls
      //     showinfo: 0     // Hide video title and player actions
      // },
      //   events: {
      //     'onReady': onPlayerReady,
      //     'onStateChange': onPlayerStateChange
      //   }
      // });
    } catch (error) {
      console.error("Error fetching YouTube video:", error);
    }
  };

  useEffect(() => {
    if (urlKey && user.ip) {
      playerRef.current = new YT.Player("youtube-player", {
        height: "360",
        width: "640",
        videoId: urlKey,
        playerVars: {
          // autoplay: 1,
          controls: 0,
          // showinfo: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }
  }, [urlKey, user.ip]);

  const destroyPlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }
  };

  const HandleWatchTimeEarning = async () => {
    if (!user.ip) {
      fetchUserIpAddress(setUser);
    }
    try {
      const Minutes=await secondsToMinutes(WatchedTime)
      const response = await fetch(Base_Api + "api/worker/YoutubeWatchEarn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": user.authToken,
        },
        body: JSON.stringify({
          IP_Address: user.ip,
          service_id: videoData._id,
          Minutes:Minutes
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        const play = document.getElementById("youtube-player");
        play.innerHTML = "";
        destroyPlayer();
        fetchYoutubeVideo();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding earning:", error);
    }
  };

  const playerRef = useRef(null);

  const onPlayerReady = (event) => {
    // You can do something when the player is ready
  };


  const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.PLAYING) {
      const intervalId = setInterval(() => {
        const player = playerRef.current;
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();

        if (currentTime >= duration - 10) {
          setWatchedTime(currentTime)
          setVideoPlayed(true);
          clearInterval(intervalId); // Stop the interval once video is played to full duration
        }
      }, 1000); // Update every second
    }
  };

  const YoutubeWatchTimeEarningInstructions = [
    { text: "Watch full video" },
    { text: "Click Next" },
    { text: "Earning will add" },
    { text: "Do not close the tab or minimize it" },
  ];


  const startVideoPlayback = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setVideoPlay(true)
    }
  };
  

  return (
    <>
      <ToastContainer />
      <div className="mx-[7vw] flex flex-col gap-12 py-10 h-[100vh]">
        <EarningInstructions
          Instructions={YoutubeWatchTimeEarningInstructions}
        />
        {urlKey && (
          <div 
            className={`w-full h-[50vh] bg-[#E3E1E1] rounded-lg flex items-center ${VideoPlay && "pointer-events-none"} justify-center`} 
            id="YoutubeSection" 
            onClick={startVideoPlayback}
          >
            <div id="youtube-player" className="pointer-events-none"></div>
            {/* <iframe
              width={"100%"}
              height={"100%"}
              src={`https://www.youtube.com/embed/${urlkey}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe> */}
          </div>
        )}
        {urlKey && (
          <div className="flex items-center justify-center">
            <button
              disabled={!VideoPlayed}
              onClick={HandleWatchTimeEarning}
              className={`two-color-gradient-background-vertical text-white px-16  font-bold py-4 rounded-md text-xl md:text-2xl lg:text-3xl ${
                !VideoPlayed && "opacity-30"
              }`}
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

export default YoutubeWatchTimeEarning;
