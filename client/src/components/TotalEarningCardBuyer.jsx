import { useState, useEffect, useContext } from "react";
import { IoCardOutline } from "react-icons/io5";
import { Base_Api } from "../utils/BaseApi";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";

const TotalEarningCardBuyer = () => {
  const [buyer, setBuyer] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchBuyer = async () => {
      try {
        const response = await fetch(Base_Api + "api/buyer/getBuyer", {
          headers: {
            "auth-token": user.authToken,
          },
        });

        const data = await response.json();

        if (data.success) {
          setBuyer(data.buyer);
        } else {
          // toast.error(data.message || data.error);
        }
      } catch (error) {
        console.log(error.message);
        // toast.error(error.message);
      }
    };

    fetchBuyer();
  }, []);

  return (
    <div className="flex justify-center flex-col items-center lg:items-start ">
      {/* <ToastContainer /> */}
      <div className="rounded-2xl bg-[#F3E8FF] w-fit flex flex-col items-center p-6 pb-8">
        <div className="bg-[#BF83FF] rounded-full w-fit p-2 mb-2">
          <IoCardOutline size={30} color="#fff" />
        </div>

        <h1 className="text-[#425166] text-xl">Your Balance</h1>
        <h1 className="text-[#151D48] font-bold text-2xl">
          ${buyer?.Funds.toFixed(3)}
        </h1>
      </div>
    </div>
  );
};

export default TotalEarningCardBuyer;
