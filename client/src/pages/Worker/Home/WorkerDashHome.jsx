import dayjs from "dayjs";
import { IoCardOutline } from "react-icons/io5";

const WorkerDashHome = () => {
  return (
    <div className="mx-[7vw] flex flex-col gap-8 py-10">
      <div>
        <h1 className="text-3xl font-bold">Hello, Anna!</h1>
        <p className="text-gray-500">{dayjs().format("dddd MMMM DD, YYYY")}</p>
      </div>
      <div className="rounded-2xl bg-[#F3E8FF] w-fit flex flex-col items-center p-6 pb-8">
        <div className="bg-[#BF83FF] rounded-full w-fit p-2 mb-2">
          <IoCardOutline size={30} color="#fff" />
        </div>

        <h1 className="text-[#425166] text-xl">Total Earning</h1>
        <h1 className="text-[#151D48] font-bold text-2xl">600$</h1>
      </div>
    </div>
  );
};

export default WorkerDashHome;
