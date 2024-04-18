import React, { useState, useContext, useEffect } from "react";
import TotalEarningCard from "../../../components/TotalEarningCard";
import jazzcashPaymentMethod from "../../../assets/svg/jazzcashPaymentMethod.svg";
import EarningsTable from "../../../components/EarningsTable";
import { UserContext } from "../../../App";
import { Base_Api } from "../../../utils/BaseApi";
import { ToastContainer, toast } from "react-toastify";
import PaymentMethodModal from "../../../components/PaymentMethodModal";
import { BsBank } from "react-icons/bs";
import WithdrawModal from "../../../components/WithdrawModal";

const WorkerDashWithdraw = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const { user } = useContext(UserContext);
  const [withdraws, setWithdraws] = useState([]);
  const [workerPaymentMethod, setWorkerPaymentMethod] = useState(null);

  useEffect(() => {
    const fetchWithdraws = async () => {
      try {
        const response = await fetch(Base_Api + "api/worker/withdaws", {
          headers: {
            "auth-token": user.authToken,
          },
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
    };

    const getWorkerPaymentMethod = async () => {
      try {
        const response = await fetch(Base_Api + "api/worker/getaccount", {
          headers: {
            "auth-token": user.authToken,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch worker payment method");
        }
        const data = await response.json();
        if (data.success) {
          setWorkerPaymentMethod(data.WokerAccount);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchWithdraws();
    getWorkerPaymentMethod();
  }, []);

  // const tableRowData = [
  //   {
  //     tid: "#23456",
  //     withdrawDate: "23 Jan 2023",
  //     platform: "Youtube Likes",
  //     amount: "$1200",
  //     status: "withdraw",
  //   },
  //   {
  //     tid: "#23456",
  //     withdrawDate: "23 Jan 2023",
  //     platform: "Youtube Likes",
  //     amount: "$1200",
  //     status: "withdraw",
  //   },
  //   {
  //     tid: "#23456",
  //     withdrawDate: "23 Jan 2023",
  //     platform: "Youtube Likes",
  //     amount: "$1200",
  //     status: "pending",
  //   },
  // ];

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openChangeModal = () => {
    setIsChangeModalOpen(true);
  };

  const openWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const closeChangeModal = () => {
    setIsChangeModalOpen(false);
  };

  const closeWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
  };

  return (
    <div className="mx-[7vw] flex flex-col gap-4 md:gap-12 py-10">
      <div className="flex flex-col justify-between  lg:flex-row">
        <div>
          <h1 className="text-lg font-semibold text-[#2C2C2C]">Withdraw</h1>
          <p className="text-[#696969] text-xs md:text-sm font-medium">
            Effortlessly handle your withdraw right here.
          </p>
        </div>
        <h1 className="text-[#4F1C54] text-lg font-bold my-4 text-center lg:text-left lg:text-2xl">
          Minimum 5$ Withdraw
        </h1>
      </div>
      <TotalEarningCard />
      <div className="lg:w-[60%] ">
        <h1 className="bg-[#EEEEEE] hidden lg:block py-4 px-4 rounded-t-2xl text-[#2C2C2C] text-[14px] font-semibold">
          Payment method
        </h1>
        {workerPaymentMethod && (
          <div className="bg-white flex flex-col lg:flex-row items-center justify-between py-6 gap-4 px-4 shadow-lg rounded-md">
            <div>
              {/* <img src={jazzcashPaymentMethod} /> */}
              <BsBank size={36} />
              <h1>{workerPaymentMethod.BankAccount}</h1>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col lg:flex-row lg:gap-10 items-center">
                <h1 className="text-[#522182] text-[14px] font-bold">
                  Account Title:
                </h1>
                <h1 className="text-[#696969] text-[12px] font-medium">
                  {workerPaymentMethod.Account_Title}
                </h1>
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-4 items-center">
                <h1 className="text-[#522182] text-[14px] font-bold">
                  Account Number:
                </h1>
                <h1 className="text-[#696969] text-[12px] font-medium">
                  {workerPaymentMethod.Account_No}
                </h1>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={openChangeModal}
                className=" text-lg px-4 py-1 font-semibold  text-[#696969] lg:px-4 lg:py-2 border-2 rounded-md border-[#ECECEC] lg:border-[#522182] lg:border-2 lg:text-[#4F1C54] lg:text-xl"
              >
                Change
              </button>
            </div>
          </div>
        )}
        {!workerPaymentMethod && (
          <div className="bg-white flex flex-col gap-2 justify-between items-center px-2 py-6 px-4shadow-lg rounded-md md:flex-row md:gap-0">
            <h1>Add a Payment Method</h1>
            <button
              onClick={openAddModal}
              className="text-[14px] font-semibold text-[#4F1C54] px-4 py-2 border-2 border-[#522182] rounded-md"
            >
              Add
            </button>
          </div>
        )}
      </div>
      {workerPaymentMethod && (
        <div className="w-full flex justify-center lg:justify-start">
          <button
            onClick={openWithdrawModal}
            className="lg:w-[60%] rounded-md text-[20px] font-semibold text-[#4F1C54] px-4 py-2 border-2 border-[#522182]"
          >
            Withdraw Money
          </button>
        </div>
      )}
      <div className="services-horizontal-scrollbar overflow-x-scroll mt-6">
        <div className="w-[700px] lg:w-full">
          <EarningsTable
            TableHeadings={["TID", "Withdraw Date", "Amount", "Status"]}
            TableRowData={withdraws}
          />
        </div>
      </div>
      {isAddModalOpen && (
        <PaymentMethodModal closeModal={closeAddModal} Add={true} />
      )}
      {isChangeModalOpen && (
        <PaymentMethodModal closeModal={closeChangeModal} Change={true} />
      )}
      {isWithdrawModalOpen && <WithdrawModal closeModal={closeWithdrawModal} />}
    </div>
  );
};

export default WorkerDashWithdraw;
