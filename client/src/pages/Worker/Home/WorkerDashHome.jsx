import dayjs from "dayjs";
import { IoCardOutline } from "react-icons/io5";
import WinningPlatformCard from "../../Portfolio/Workers/WorkersBody/WinningPlatformCard";
import WorkerYoutubePlatformCard from "../../../components/WorkerYoutubePlatformCard";
import WorkerGooglePlatformCard from "../../../components/WorkerGooglePlatformCard";
import EarningsTable from "../../../components/EarningsTable";
import TotalEarningCard from "../../../components/TotalEarningCard";

const WorkerDashHome = () => {
  const CardData = [
    {
      title: "Youtube View",
      earningType: "Per View",
      earning: "$10",
      description: "You can earn from youtube by just watching videos.",
      type: "youtube",
    },
    {
      title: "Youtube Subscribe",
      earningType: "Per View",
      earning: "$10",
      description: "You can earn from youtube by just watching videos.",
      type: "youtube",
    },
    {
      title: "Youtube watchtime",
      earningType: "Per View",
      earning: "$10",
      description: "You can earn from youtube by just watching videos.",
      type: "youtube",
    },
    {
      title: "Google Views",
      earningType: "Per View",
      earning: "$10",
      description: "You can earn from youtube by just watching videos.",
      type: "google",
    },
    {
      title: "Google Ad View",
      earningType: "Per View",
      earning: "$10",
      description: "You can earn from youtube by just watching videos.",
      type: "google",
    },
  ];

  const TableRowData = [
    {
      tid: "#23456",
      withdrawDate: "23 Jan 2023",
      platform: "Youtube Likes",
      amount: "$1200",
    },
    {
      tid: "#23456",
      withdrawDate: "23 Jan 2023",
      platform: "Youtube Likes",
      amount: "$1200",
    },
    {
      tid: "#23456",
      withdrawDate: "23 Jan 2023",
      platform: "Youtube Likes",
      amount: "$1200",
    },
  ];

  return (
    <div className="mx-[7vw] flex flex-col gap-8 py-10">
      <div>
        <h1 className="text-3xl font-bold">Hello, Anna!</h1>
        <p className="text-gray-500">{dayjs().format("dddd MMMM DD, YYYY")}</p>
      </div>
      <TotalEarningCard />
      <div className="grid grid-cols-1 justify-items-center gap-x-4 items-center  md:grid-cols-2  lg:my-5 lg:grid-cols-5">
        {CardData.map((card, index) => {
          if (card.type == "youtube")
            return (
              <WorkerYoutubePlatformCard
                Title={card.title}
                Description={card.description}
                Earning={card.earning}
                EarningType={card.earningType}
              />
            );
          else
            return (
              <WorkerGooglePlatformCard
                Title={card.title}
                Description={card.description}
                Earning={card.earning}
                EarningType={card.earningType}
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
            TableHeadings={["TID", "Withdraw Date", "Platform", "Amount"]}
            TableRowData={TableRowData}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkerDashHome;
