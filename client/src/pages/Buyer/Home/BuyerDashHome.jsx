import dayjs from "dayjs";
import BuyerHomeEarningsTable from "../../../components/BuyerHomeEarningsTable";
import PlansCardBuyer from "../../../components/PlansCardBuyer";
import TotalEarningCard from "../../../components/TotalEarningCard";
import BlackButton from "../../../components/BlackButton";
import { useContext, useEffect, useState } from "react";
import { Base_Api } from "../../../utils/BaseApi";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../../App";



const BuyerDashHome = () => {
  const { user } = useContext(UserContext);
  const [plans, setPlans] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(Base_Api + 'api/buyer/getPlans');
        const data = await response.json();
        if (data.success) {
          setPlans(data.plan);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Error fetching plans:', error);
        // Handle error state here if needed
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch(Base_Api + "api/buyer/ServicesTaken", {
          method: 'GET',
          headers: {
            'auth-token':  user.authToken 
          }
        });
        const data = await response.json();
        console.log("data received: ",data)
        if (data.success) {
          setServices(data.services);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Error fetching services:', error);
      }
    };

    fetchPlans();
    fetchServices();
  }, []);

  console.log("buyer plans: ",plans)
  console.log("buyer taken services: ",services)

  const TableRowData = [
    {
      tid: "#23456",
      name: "Youtube Subscribers",
      complete: "100%",
      amount: "100k",
      status: "Complete",
    },
    {
      tid: "#23456",
      name: "Instagram Followers",
      complete: "80%",
      amount: "120k",
      status: "Complete",
    },
    {
      tid: "#23456",
      name: "Google Ad View",
      complete: "60%",
      amount: "20k",
      status: "Pending",
    },
  ];

  // const buyPlans = [
  //   {
  //     title: "YouTube Subscribers",
  //     price: "$20",
  //     features: ["10 Subscribers"],
  //   },
  //   {
  //     title: "Instagram Followers",
  //     price: "$20",
  //     features: ["10 Followers"],
  //   },
  //   {
  //     title: "Tiktok Followers",
  //     price: "$20",
  //     features: ["10 Followers"],
  //   },
  //   {
  //     title: "Youtube Views",
  //     price: "$20",
  //     features: ["10k Views"],
  //   },
  //   {
  //     title: "Google Views",
  //     price: "$20",
  //     features: ["10k Views"],
  //   },
  //   {
  //     title: "Facebook Followers",
  //     price: "$20",
  //     features: ["10 Followers"],
  //   },
  //   {
  //     title: "Youtube WatchTime",
  //     price: "$20",
  //     features: ["10k Views"],
  //   },
  //   {
  //     title: "Google Ad Views",
  //     price: "$20",
  //     features: ["10k Views"],
  //   },
  // ];

  return (
    <>
    <ToastContainer/>
    <div className="mx-[7vw] flex flex-col gap-8 py-10">
      {/* <div>
        <h1 className="text-3xl font-bold">Hello, Anna!</h1>
        <p className="text-gray-500">{dayjs().format("dddd MMMM DD, YYYY")}</p>
      </div>
      <TotalEarningCard /> */}
      {/* <div className="grid grid-cols-1 justify-items-center gap-x-4 items-center  md:grid-cols-2  lg:my-5 lg:grid-cols-5">
        {CardData.map((card, index) => {
          if (card.type == "youtube")
            return (
              <WorkerYoutubecompleteCar100%={index}
                Title={card.title}
                Description={card.description}
                Earning={card.earning}
                EarningType={card.earningType}
              />
            );
          else
            return (
              <WorkerGooglecompleteCar100%={index}
                Title={card.title}
                Description={card.description}
                Earning={card.earning}
                EarningType={card.earningType}
              />
            );
        })}
      </div> */}

      <div className="w-full">
        <div className="flex justify-between w-[80%]">
          <div>
            <h1 className="text-xl font-semibold text-[#2C2C2C]">Services</h1>
            <p className="text-sm font-medium my-2 text-[#696969]">
              Effortlessly handle all your services.
            </p>
          </div>
          <div>
            <BlackButton text={"Filters"} />
          </div>
        </div>
        <div className=" mt-6">
          <BuyerHomeEarningsTable
            TableHeadings={["TID", "Name", "Complete", "Amount", "Status"]}
            TableRowData={services}
          />
        </div>
      </div>

      <div className=" grid grid-cols-4 gap-4 my-8 flex-wrap md:mx-10 justify-center">
        {plans.map((plan, index) => (
          <PlansCardBuyer
            key={index}
            title={plan.Service}
            price={"$" + plan.Price * 100}
            features={["100 subscribers"]}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default BuyerDashHome;
