import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import WorkerGooglePlatformCard from "../../../components/WorkerGooglePlatformCard";
import WorkerYoutubePlatformCard from "../../../components/WorkerYoutubePlatformCard";
import { Base_Api } from "../../../utils/BaseApi";
import { UserContext } from "../../../App";
import { fetchUserIpAddress } from "../../../utils/FetchUsersIp";

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
    }, [])

    console.log("user's ip: ", user?.ip);
    
  return (
    <>
      <ToastContainer />
      <div className="mx-[7vw]  py-10 grid grid-cols-1 justify-items-center gap-x-4 items-center  md:grid-cols-2  lg:my-5 lg:grid-cols-5">
          {earningPlans.map((plan) => {
            if (plan.Channel == "Youtube")
              return (
                <WorkerYoutubePlatformCard
                  key={plan._id}
                  Title={plan.Service}
                  Earning={`$${plan.Price*100}`}
                  EarningType={"Per View"}
                />
              );
            else
              return (
                <WorkerGooglePlatformCard
                key={plan._id}
                Title={plan.Service}
                Earning={`$${plan.Price*100}`}
                EarningType={"Per View"}
                />
              );
          })}
        </div>
    </>
  );
};

export default Earning;
