import React, { useContext, useRef } from "react";
import { UserContext } from "../App";
import { Base_Api } from "../utils/BaseApi";
import { ToastContainer, toast } from "react-toastify";

const WithdrawModal = ({closeModal}) => {
  const { user } = useContext(UserContext);
  const amountRef = useRef(null);

  function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  const handleWithdraw = async () => {
    if (!isNumber(amountRef.current.value)) {
      toast.warning("Amount should be a number");
      return;
    }

    if(amountRef.current.value < 5){
        toast.warning("Amount should be greater than 5$");
        return;
    }

    try {
        const response = await fetch(
          Base_Api + `api/worker/createwithdraw`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": user.authToken,
            },
            body: JSON.stringify({
              Amount: amountRef.current.value,
            }),
          }
        );
        const data = await response.json();
        if (data.success) {
          toast.success("Payment withdrawn successfully");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  return (
    <>
      <ToastContainer />
      <div
        onClick={handleOverlayClick}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="bg-white w-[40%] rounded-md px-5 py-4">
          <div className="flex flex-col mt-5 ">
            <label
              htmlFor="newAccountTitle"
              className="text-[#522182] font-bold"
            >
              Withdraw Amount:
            </label>
            <span className="border-2 my-2 border-[#522182] rounded-lg">
              <input
                ref={amountRef}
                type="number"
                className=" bg-transparent  m-0 outline-none border border-black"
              />
            </span>
          </div>
          <button
            className="mt-4 two-color-gradient-background-vertical text-xl text-white font-semibold w-full px-4 py-4 rounded-md"
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </div>
      </div>
    </>
  );
};

export default WithdrawModal;
