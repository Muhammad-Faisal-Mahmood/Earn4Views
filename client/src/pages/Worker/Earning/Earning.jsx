import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import WorkerGooglePlatformCard from "../../../components/WorkerGooglePlatformCard";
import WorkerYoutubePlatformCard from "../../../components/WorkerYoutubePlatformCard";
import { Base_Api } from "../../../utils/BaseApi";
import { UserContext } from "../../../App";
import { fetchUserIpAddress } from "../../../utils/FetchUsersIp";
import TotalEarningCard from "../../../components/TotalEarningCard";

const Earning = () => {
  const [earningPlans, setEarningPlans] = useState([]);
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const fetchEarningPlans = async () => {
      try {
        const response = await fetch(Base_Api + "api/worker/getEarningPlans");
        if (!response.ok) {
          throw new Error("Failed to fetch earning plans");
        }
        const data = await response.json();
        if (data.success) {
          setEarningPlans(data.earning);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchEarningPlans();
    fetchUserIpAddress();
  }, []);

  console.log("user's ip: ", user?.ip);

  return (
    <>
      <ToastContainer />
      <div className="mx-[7vw] h-[100vh] py-10 flex flex-col gap-12">
        <div>
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">
            Start Earning Right Now
          </h1>
        </div>
        <TotalEarningCard />
        <div className=" grid grid-cols-2  gap-x-4 gap-y-10  md:grid-cols-3 lg:grid-cols-4  xl:my-5 xl:grid-cols-5">
          {earningPlans.map((plan) => {
            if (plan.Channel == "Youtube")
              return (
                <WorkerYoutubePlatformCard
                  key={plan._id}
                  Title={plan.Service}
                  Earning={`$${plan.Price}`}
                  EarningType={"Per View"}
                />
              );
            else
              return (
                <WorkerGooglePlatformCard
                  key={plan._id}
                  Title={plan.Service}
                  Earning={`$${plan.Price}`}
                  EarningType={"Per View"}
                />
              );
          })}
        </div>
      </div>
    </>
  );
};

export default Earning;
