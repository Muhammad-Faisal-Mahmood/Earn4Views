import dayjs from "dayjs";
import WorkerYoutubePlatformCard from "../../../components/WorkerYoutubePlatformCard";
import WorkerGooglePlatformCard from "../../../components/WorkerGooglePlatformCard";
import EarningsTable from "../../../components/EarningsTable";
import TotalEarningCard from "../../../components/TotalEarningCard";
import { UserContext } from "../../../App";
import { useContext, useEffect, useState } from "react";
import { Base_Api } from "../../../utils/BaseApi";
import { ToastContainer, toast } from "react-toastify";

const WorkerDashHome = () => {
  const { user } = useContext(UserContext);
  const [withdraws, setWithdraws] = useState([])
  const [earningPlans, setEarningPlans] = useState([]);

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

    const fetchWithdraws = async() =>{
      try {
        const response = await fetch(Base_Api + "api/worker/withdaws", {
          headers: {
            "auth-token": user.authToken 
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch withdraws");
        }
        const data = await response.json();
        if (data.success) {
          setWithdraws(data.withdraw);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    fetchWithdraws()
    fetchEarningPlans();
  }, []);

  console.log("worker earning plans: ",earningPlans);
  console.log("worker withdraws: ",withdraws);
  // const CardData = [
  //   {
  //     title: "Youtube View",
  //     earningType: "Per View",
  //     earning: "$10",
  //     description: "You can earn from youtube by just watching videos.",
  //     type: "youtube",
  //   },
  //   {
  //     title: "Youtube Subscribe",
  //     earningType: "Per View",
  //     earning: "$10",
  //     description: "You can earn from youtube by just watching videos.",
  //     type: "youtube",
  //   },
  //   {
  //     title: "Youtube watchtime",
  //     earningType: "Per View",
  //     earning: "$10",
  //     description: "You can earn from youtube by just watching videos.",
  //     type: "youtube",
  //   },
  //   {
  //     title: "Google Views",
  //     earningType: "Per View",
  //     earning: "$10",
  //     description: "You can earn from youtube by just watching videos.",
  //     type: "google",
  //   },
  //   {
  //     title: "Google Ad View",
  //     earningType: "Per View",
  //     earning: "$10",
  //     description: "You can earn from youtube by just watching videos.",
  //     type: "google",
  //   },
  // ];

  // const TableRowData = [
  //   {
  //     tid: "#23456",
  //     withdrawDate: "23 Jan 2023",
  //     platform: "Youtube Likes",
  //     amount: "$1200",
  //   },
  //   {
  //     tid: "#23456",
  //     withdrawDate: "23 Jan 2023",
  //     platform: "Youtube Likes",
  //     amount: "$1200",
  //   },
  //   {
  //     tid: "#23456",
  //     withdrawDate: "23 Jan 2023",
  //     platform: "Youtube Likes",
  //     amount: "$1200",
  //   },
  // ];

  return (
    <>
      <ToastContainer />
      <div className="mx-[7vw] flex flex-col gap-8 py-10">
        <div>
          <h1 className="text-3xl font-bold">
            Hello,{" "}
            <span className="capitalize">{`${user?.Name.split(" ")[0]}`}</span>!
          </h1>
          <p className="text-gray-500">
            {dayjs().format("dddd MMMM DD, YYYY")}
          </p>
        </div>
        <TotalEarningCard />
        <div className="grid grid-cols-1 justify-items-center gap-x-4 items-center  md:grid-cols-2  lg:my-5 lg:grid-cols-5">
          {earningPlans.map((plan, index) => {
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

        <div>
          <h1 className="text-lg font-semibold text-[#2C2C2C]">Earnings</h1>
          <p className="text-xs font-medium my-2 text-[#696969]">
            Effortlessly handle your withdraws right here.
          </p>
          <div className="w-[90%] mt-6">
            <EarningsTable
              TableHeadings={["TID", "Withdraw Date", "Amount", "Status"]}
              TableRowData={withdraws}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkerDashHome;
