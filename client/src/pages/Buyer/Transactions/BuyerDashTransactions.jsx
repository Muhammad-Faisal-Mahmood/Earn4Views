import jazzcashPaymentMethod from "../../../assets/svg/jazzcashPaymentMethod.svg";
import BlackButton from "../../../components/BlackButton";
import EarningsTable from "../../../components/EarningsTable";

const BuyerDashTransactions = () => {
  const tableRowData = [
    {
      tid: "#23456",
      withdrawDate: "23 Jan 2023",
      platform: "Basic Plan",
      amount: "$1200",
      status: "Paid",
    },
    {
      tid: "#23456",
      withdrawDate: "23 Jan 2023",
      platform: "Pro Plan",
      amount: "$1200",
      status: "Paid",
    },
    {
      tid: "#23456",
      withdrawDate: "23 Jan 2023",
      platform: "Advance Plan",
      amount: "$1200",
      status: "Pending",
    },
  ];

  return (
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
            />
            <h1>Funds</h1>
            <input
              type="text"
              className=" p-2 shadow-basic bg-white"
              placeholder="Enter the funds"
            />
          </div>
          <div className="">
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
            </div>
          </div>
        </div>

        <div className="w-full">
          <button className="text-white p-4 font-bold rounded-lg w-full two-color-gradient-background">
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
            "Plan",
            "Amount",
            "Status",
          ]}
          TableRowData={tableRowData}
        />
      </div>
    </div>
  );
};

export default BuyerDashTransactions;
