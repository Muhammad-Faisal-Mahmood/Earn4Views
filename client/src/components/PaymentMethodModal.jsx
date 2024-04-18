import React, { useContext, useRef } from "react";
import { BanksList } from "../utils/BanksList";
import { UserContext } from "../App";
import { Base_Api } from "../utils/BaseApi";
import { ToastContainer, toast } from "react-toastify";

const PaymentMethodModal = ({ closeModal, Add, Change }) => {
  const { user } = useContext(UserContext);
  const bankRef = useRef(null);
  const accountTitleRef = useRef(null);
  const accountNumberRef = useRef(null);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const HandleAccountChange = async () => {
    if (
      bankRef.current.value == "" ||
      accountTitleRef.current.value == "" ||
      accountNumberRef.current.value == ""
    ) {
      toast.warning("Enter valid data");
      return;
    }
    try {
      const response = await fetch(
        Base_Api + `api/worker/workeraccount/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": user.authToken,
          },
          body: JSON.stringify({
            BankAccount: bankRef.current.value,
            Account_No: accountNumberRef.current.value,
            Account_Title: accountTitleRef.current.value,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Payment method switched successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const HandleAccountAdd = async () => {
    if (
      bankRef.current.value == "" ||
      accountTitleRef.current.value == "" ||
      accountNumberRef.current.value == ""
    ) {
      toast.warning("Enter valid data");
      return;
    }

    try {
      const response = await fetch(Base_Api + `api/worker/withdrawAccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": user.authToken,
        },
        body: JSON.stringify({
          BankAccount: bankRef.current.value,
          Account_No: accountNumberRef.current.value,
          Account_Title: accountTitleRef.current.value,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Payment method added successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <div
        onClick={handleOverlayClick}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center px-8 md:px-0"
      >
        <div className="bg-white w-full md:w-[40%] rounded-md px-5 py-4">
          <div className="flex flex-col mt-5 ">
            <label
              htmlFor="newAccountTitle"
              className="text-[#522182] font-bold"
            >
              Select Bank:
            </label>
            <span className="border-2 my-2 border-[#522182] rounded-lg">
              <select
                id="bank"
                ref={bankRef}
                className="bg-transparent w-full py-3 outline-none  "
              >
                <option value="">Select Bank</option>
                {BanksList.map((bank, index) => (
                  <option key={index} value={bank.name}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </span>
            <label
              htmlFor="newAccountNumber"
              className="text-[#522182] font-bold mt-3"
            >
              Account Title:
            </label>
            <span className="border-2 my-2 border-[#522182] rounded-lg">
              <input
                ref={accountTitleRef}
                type="text"
                id="newAccountTitle"
                className=" bg-transparent  m-0 outline-none border border-black"
              />
            </span>
            <label
              htmlFor="newPaymentMethod"
              className="text-[#522182] font-bold mt-3"
            >
              Account Number:
            </label>
            <span className="border-2 my-2 border-[#522182] rounded-lg">
              <input
                ref={accountNumberRef}
                type="text"
                id="newAccountTitle"
                className=" bg-transparent  m-0 outline-none border border-black"
              />
            </span>
          </div>
          <button
            className="mt-4 two-color-gradient-background-vertical text-xl text-white font-semibold w-full px-4 py-4 rounded-md"
            onClick={() => (Add ? HandleAccountAdd() : HandleAccountChange())}
          >
            {Add ? "Add" : "Change"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentMethodModal;
