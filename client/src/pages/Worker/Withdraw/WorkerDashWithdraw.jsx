import React, { useState } from "react";
import TotalEarningCard from "../../../components/TotalEarningCard";
import jazzcashPaymentMethod from "../../../assets/svg/jazzcashPaymentMethod.svg";
import EarningsTable from "../../../components/EarningsTable";

const WorkerDashWithdraw = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRowData = [
    {
      tid: "#23456",
      withdrawDate: "23 Jan 2023",
      platform: "Youtube Likes",
      amount: "$1200",
      status: "withdraw",
    },
    {
      tid: "#23456",
      withdrawDate: "23 Jan 2023",
      platform: "Youtube Likes",
      amount: "$1200",
      status: "withdraw",
    },
    {
      tid: "#23456",
      withdrawDate: "23 Jan 2023",
      platform: "Youtube Likes",
      amount: "$1200",
      status: "pending",
    },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-[7vw] flex flex-col gap-12 py-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold text-[#2C2C2C]">Withdraw</h1>
          <p className="text-[#696969] text-sm font-medium">
            Effortlessly handle your withdraw right here.
          </p>
        </div>
        <h1 className="text-[#4F1C54] text-2xl font-bold">
          Minimum 5$ Withdraw
        </h1>
      </div>
      <TotalEarningCard />
      <div className="w-[60%] ">
        <h1 className="bg-[#EEEEEE] py-4 px-4 rounded-t-2xl text-[#2C2C2C] text-[14px] font-semibold">
          Payment method
        </h1>
        <div className="bg-white flex justify-between py-6 px-4 shadow-lg rounded-md">
          <div>
            <img src={jazzcashPaymentMethod} />
            <h1>Jazz Cash</h1>
          </div>
          <div>
            <div className="flex gap-10 items-center">
              <h1 className="text-[#522182] text-[14px] font-bold">
                Account Title:
              </h1>
              <h1 className="text-[#696969] text-[12px] font-medium">
                Sohaib Shoukat
              </h1>
            </div>
            <div className="flex gap-4 items-center">
              <h1 className="text-[#522182] text-[14px] font-bold">
                Account Number:
              </h1>
              <h1 className="text-[#696969] text-[12px] font-medium">
                1234 3456 6789 4002
              </h1>
            </div>
          </div>
          <div className="">
            <button
              onClick={openModal}
              className="text-[14px] font-semibold text-[#4F1C54] px-4 py-2 border-2 border-[#522182]"
            >
              Change
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <EarningsTable
          TableHeadings={[
            "TID",
            "Withdraw Date",
            "Platform",
            "Amount",
            "Status",
          ]}
          TableRowData={tableRowData}
        />
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-[40%] rounded-md px-5 py-4">
            <div className="flex flex-col mt-5 ">
              <label htmlFor="newAccountTitle" className="text-[#522182]">
                Select Bank
              </label>
              <span className="border-2 my-2 border-[#522182] rounded-lg">
                <input
                  type="text"
                  id="newAccountTitle"
                  className=" bg-transparent  m-0 outline-none border border-black"
                />
              </span>
              <label htmlFor="newAccountNumber" className="text-[#522182]">
                Account Title:
              </label>
              <span className="border-2 my-2 border-[#522182] rounded-lg">
                <input
                  type="text"
                  id="newAccountTitle"
                  className=" bg-transparent  m-0 outline-none border border-black"
                />
              </span>
              <label htmlFor="newPaymentMethod" className="text-[#522182]">
                Account Number:
              </label>
              <span className="border-2 my-2 border-[#522182] rounded-lg">
                <input
                  type="text"
                  id="newAccountTitle"
                  className=" bg-transparent  m-0 outline-none border border-black"
                />
              </span>
            </div>
            <button
              className="mt-4 two-color-gradient-background-vertical text-white font-semibold w-full px-4 py-2 rounded-md"
              onClick={closeModal}
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerDashWithdraw;
