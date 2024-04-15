import { UserContext } from "../../../App";
import jazzcashPaymentMethod from "../../../assets/svg/jazzcashPaymentMethod.svg";
import BlackButton from "../../../components/BlackButton";
import EarningsTable from "../../../components/EarningsTable";
import { useContext, useEffect, useRef, useState } from 'react';
import { Base_Api } from "../../../utils/BaseApi";
import { ToastContainer, toast } from "react-toastify";
import { BsBank } from "react-icons/bs";


const BuyerDashTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [adminPaymentMethod, setAdminPaymentMethod] = useState([]);
  const { user } = useContext(UserContext);
  const TIDRef = useRef(null);
  const fundsRef = useRef(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(Base_Api + 'api/buyer/getTransaction', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': user.authToken // Replace yourAuthToken with the actual auth token if needed
          },
        });
        const data = await response.json();
        if (data.success) {
          setTransactions(data.transaction);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error);
        // Handle error state here if needed
      }
    };

    const fetchPaymentAccount = async () => {
      try {
        const response = await fetch(Base_Api + 'api/buyer/PaymentAccount', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': user.authToken
          },
        });
        const data = await response.json();
        if (data.success) {
          setAdminPaymentMethod(data.account[0]);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error);
        // Handle error state here if needed
      }
    };

    fetchTransactions();
    fetchPaymentAccount();
  }, []);

  const handleTransaction = async()=>{

    if(TIDRef.current.value == "" || fundsRef.current.value == ""){
      return toast.warning("Please Enter Transaction ID and funds");
    }

    try {
      const response = await fetch(Base_Api + 'api/buyer/createTransactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': user.authToken
        },
        body: JSON.stringify({
          TID: TIDRef.current.value,
          Amount: fundsRef.current.value
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Transaction sent to admin for approval");
        // Clear input fields or update transactions data if needed
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast.error('Error creating transaction');
    }
  }

  console.log("all transactions data: ", transactions);
  console.log("admin payment method details: ", adminPaymentMethod);
  // const tableRowData = [
  //   {
  //     tid: "#23456",
  //     withdrawDate: "23 Jan 2023",
  //     platform: "Basic Plan",
  //     amount: "$1200",
  //     status: "Paid",
  //   },
  //   {
  //     tid: "#23456",
  //     withdrawDate: "23 Jan 2023",
  //     platform: "Pro Plan",
  //     amount: "$1200",
  //     status: "Paid",
  //   },
  //   {
  //     tid: "#23456",
  //     withdrawDate: "23 Jan 2023",
  //     platform: "Advance Plan",
  //     amount: "$1200",
  //     status: "Pending",
  //   },
  // ];

  return (
    <>
    <ToastContainer />
   
    <div className="mx-[7vw] flex flex-col gap-12 py-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold text-[#2C2C2C]">Billing</h1>
          <p className="text-[#696969] text-sm font-medium">
            Effortlessly handle your billing and invoices right here.
          </p>
        </div>
        <div>
          <BlackButton text={"Add Fund"} />
        </div>
      </div>
      <div className="shadow-basic rounded-xl p-8 grid gap-10  bg-white items-center">
        <div className="grid grid-cols-2 gap-20">
          <div>
            <h1>TID:</h1>
            <input
              type="text"
              className=" p-2 shadow-basic bg-white"
              placeholder="Example: #123456"
              ref={TIDRef}
            />
            <h1>Funds</h1>
            <input
              type="text"
              className=" p-2 shadow-basic bg-white"
              placeholder="Enter the funds"
              ref={fundsRef}
            />
          </div>
          <div className="">
            <h1 className="bg-[#EEEEEE] py-4 px-4 rounded-t-2xl text-[#2C2C2C] text-[14px] font-semibold">
              Payment method
            </h1>
            <div className="bg-white flex justify-between py-6 px-4 shadow-lg rounded-md">
              <div>
                {/* <img src={jazzcashPaymentMethod} /> */}
                <BsBank size={26}/>
                <h1>{adminPaymentMethod?.BankAccount}</h1>
              </div>
              <div>
                <div className="flex gap-10 items-center">
                  <h1 className="text-[#522182] text-[14px] font-bold">
                    Account Title:
                  </h1>
                  <h1 className="text-[#696969] text-[12px] font-medium">
                    {adminPaymentMethod?.Account_Title}
                  </h1>
                </div>
                <div className="flex gap-4 items-center">
                  <h1 className="text-[#522182] text-[14px] font-bold">
                    Account Number:
                  </h1>
                  <h1 className="text-[#696969] text-[12px] font-medium">
                    {adminPaymentMethod?.Account_No}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <button onClick={handleTransaction} className="text-white p-4 font-bold rounded-lg w-full two-color-gradient-background">
            Pay Now
          </button>
        </div>
      </div>
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-lg font-semibold text-[#2C2C2C]">Invoice</h1>
            <p className="text-[#696969] text-sm font-medium">
              Effortlessly handle your billing and invoices right here.
            </p>
          </div>
          <div>
            <BlackButton text={"Download"} />
          </div>
        </div>
        <EarningsTable
          TableHeadings={[
            "Invoice ID",
            "Billing Date",
            // "Plan",
            "Amount",
            "Status",
          ]}
          TableRowData={transactions}
        />
      </div>
    </div>
    </>
  );
};

export default BuyerDashTransactions;
