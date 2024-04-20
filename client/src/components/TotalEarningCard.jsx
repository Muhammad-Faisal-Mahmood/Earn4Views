import { useState, useEffect, useContext } from "react";
import { IoCardOutline } from "react-icons/io5";
import { Base_Api } from "../utils/BaseApi";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";

const TotalEarningCard = () => {
  const [worker, setWorker] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchWorker = async () => {
      if(!user) return;
      try {
        const response = await fetch(Base_Api + "api/worker/getworker", {
          headers: {
            "auth-token": user.authToken,
          },
        });

        const data = await response.json();

        if (data.success) {
          setWorker(data.woker);
        } else {
          toast.error(data.message || data.error);
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };

    fetchWorker();
  }, [user]);

  return (
    <div className="flex justify-center flex-col items-center lg:items-start ">
      <ToastContainer />
      <div className="rounded-2xl bg-[#F3E8FF] w-fit flex flex-col items-center p-6 pb-8">
        <div className="bg-[#BF83FF] rounded-full w-fit p-2 mb-2">
          <IoCardOutline size={30} color="#fff" />
        </div>

        <h1 className="text-[#425166] text-xl">Total Earning</h1>
        <h1 className="text-[#151D48] font-bold text-2xl">
          ${worker?.Earning.toFixed(3)}
        </h1>
      </div>
    </div>
  );
};

export default TotalEarningCard;
