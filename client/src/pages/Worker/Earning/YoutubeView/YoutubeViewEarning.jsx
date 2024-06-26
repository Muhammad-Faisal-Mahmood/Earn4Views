import React, { useContext, useEffect, useState } from "react";
import EarningInstructions from "../../../../components/EarningInstructions";
import { Base_Api } from "../../../../utils/BaseApi";
import { UserContext } from "../../../../App";
import getYouTubeID from "get-youtube-id";
import { ToastContainer, toast } from "react-toastify";
import { fetchUserIpAddress } from "../../../../utils/FetchUsersIp";

const YoutubeViewEarning = () => {
  const { user, setUser } = useContext(UserContext);
  const [videoData, setVideoData] = useState(null);
  const [noServicesAvailable, setNoServicesAvailable] = useState(false);
  const [VideoPlayed, setVideoPlayed] = useState(false);

  useEffect(() => {
    fetchYoutubeVideo();
    fetchUserIpAddress(setUser);
  }, [user]);

  const fetchYoutubeVideo = async () => {
    if (!user.ip) {
      fetchUserIpAddress(setUser);
    }
    setVideoPlayed(false);
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
      setTimeout(() => {
        setVideoPlayed(true);
      }, 180000);
    } catch (error) {
      console.error("Error fetching YouTube video:", error);
    }
  };

  const HandleYoutubeViewEarning = async () => {
    if (!user.ip) {
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
      } else {
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
    { text: "Do not close the tab or minimize it" },
  ];

  return (
    <>
      <ToastContainer />
      <div className="mx-[7vw] flex flex-col gap-12 py-10 h-[100vh]">
        <EarningInstructions Instructions={YoutubeViewEarningInstructions} />
        {urlkey && (
          <div className="w-full h-[50vh] bg-[#E3E1E1] rounded-lg flex items-center justify-center pointer-events-none">
            <iframe
              width={"100%"}
              height={"100%"}
              src={`https://www.youtube.com/embed/${urlkey}?autoplay=1&controls=0`}
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
              disabled={!VideoPlayed}
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

export default YoutubeViewEarning;

// import React, { useContext, useEffect, useRef, useState } from "react";
// import EarningInstructions from "../../../../components/EarningInstructions";
// import { Base_Api } from "../../../../utils/BaseApi";
// import { UserContext } from "../../../../App";
// import getYouTubeID from "get-youtube-id";
// import { ToastContainer, toast } from "react-toastify";
// import { fetchUserIpAddress } from "../../../../utils/FetchUsersIp";

// const YoutubeViewEarning = () => {
//   const { user, setUser } = useContext(UserContext);
//   const [videoData, setVideoData] = useState(null);
//   const [noServicesAvailable, setNoServicesAvailable] = useState(false);
//   const [VideoPlayed, setVideoPlayed] = useState(false)

//   useEffect(() => {
//     fetchYoutubeVideo();
//     fetchUserIpAddress(setUser);
//   }, []);

//   const fetchYoutubeVideo = async () => {
//     if (!user.ip) {
//       fetchUserIpAddress(setUser);
//     }
//     setVideoPlayed(false)
//     try {
//       const response = await fetch(Base_Api + "api/worker/YoutubeView", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": user.authToken,
//         },
//         body: JSON.stringify({ IP_Address: user.ip }),
//       });

//       const data = await response.json();
//       if (!data?.success && data?.service == 0) {
//         setNoServicesAvailable(true);
//         return;
//       }
//       setVideoData(data);
//     } catch (error) {
//       console.error("Error fetching YouTube video:", error);
//     }
//   };

//   const HandleYoutubeViewEarning = async () => {
//     if (!user.ip) {
//       fetchUserIpAddress(setUser);
//     }
//     try {
//       const response = await fetch(Base_Api + "api/worker/YoutubeViewEarn", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": user.authToken,
//         },
//         body: JSON.stringify({
//           IP_Address: user.ip,
//           service_id: videoData._id,
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(data.message);
//         fetchYoutubeVideo();
//       }
//       else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error adding earning:", error);
//     }
//   };

//   const playerRef = useRef(null);

//   useEffect(() => {
//     playerRef.current = new YT.Player('youtube-player', {
//       height: '360',
//       width: '640',
//       videoId: urlkey,
//       events: {
//         'onReady': onPlayerReady,
//         'onStateChange': onPlayerStateChange
//       }
//     });
//   }, [videoData?.URL]);

//   const onPlayerReady = (event) => {
//     // You can do something when the player is ready
//   };

//   // Callback function to track video time
//   const onPlayerStateChange = (event) => {
//     if (event.data === YT.PlayerState.PLAYING) {
//       setInterval(() => {
//         console.log('Current time:', playerRef.current.getCurrentTime());
//         const currentTime = playerRef.current.getCurrentTime();
//         if (currentTime >= 10) {
//           console.log('Video has been playing for 3 minutes');
//           setVideoPlayed(true)
//         }
//       }, 1000); // Update every second
//     }
//   };

//   const urlkey = getYouTubeID(videoData?.URL);
//   const YoutubeViewEarningInstructions = [
//     { text: "3 Minute Watch video" },
//     { text: "Click Next" },
//     { text: "Earning will add" },
//   ];

//   return (
//     <>
//       <ToastContainer />
//       <div className="mx-[7vw] flex flex-col gap-12 py-10 h-[100vh]">
//         <EarningInstructions Instructions={YoutubeViewEarningInstructions} />
//         {urlkey && (
//           <div className="w-full h-[50vh] bg-[#E3E1E1] rounded-lg flex items-center justify-center">
//             <div id="youtube-player"></div>
//             {/* <iframe
//               width={"100%"}
//               height={"100%"}
//               src={`https://www.youtube.com/embed/${urlkey}?autoplay=1&controls=0&showinfo=0`}
//               title="YouTube video player"
//               frameborder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowfullscreen
//             ></iframe> */}
//           </div>
//         )}
//         {urlkey && (
//           <div className="flex items-center justify-center">
//             <button
//               onClick={HandleYoutubeViewEarning}
//               disabled={!VideoPlayed}
//               className={`two-color-gradient-background-vertical text-white px-16  font-bold py-4 rounded-md text-xl md:text-2xl lg:text-3xl ${!VideoPlayed && 'opacity-30'}`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//         {noServicesAvailable && (
//           <div>
//             <h1 className="text-xl font-medium">
//               No Services available at the moment. Try again later..
//             </h1>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default YoutubeViewEarning;
