import dayjs from "dayjs";
import userProfile from "../../../assets/svg/profile-user.svg";
import { FaPencil } from "react-icons/fa6";
import DummyCnic from "../../../assets/svg/WorkerProfileCnic.svg";
import { FaCamera } from "react-icons/fa";
const WorkerDashProfile = () => {
  const ProfileFields = [
    { label: "user name", placeholder: "Codyfisher" },
    { label: "phone number", placeholder: "123 456 7890" },
    { label: "Age", placeholder: "20" },
    { label: "gender", placeholder: "female" },
    { label: "email", placeholder: "Codyfisher@gmail.com" },
    { label: "cnic", placeholder: "123 456 7890 3" },
  ];

  return (
    <div className="mx-[7vw]  flex flex-col gap-8 py-10">
      <div className="flex flex-col absolute top-[24%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <img src={userProfile} className="size-36" />
        <h1 className="font-bold text-[#1A1A1A] text-4xl">Anna Roye</h1>
      </div>
      <div>
        <h1 className="text-3xl font-bold">Hello, Anna!</h1>
        <p className="text-gray-500">{dayjs().format("dddd MMMM DD, YYYY")}</p>
      </div>

      <div className=" mt-48">
        <form className="grid grid-cols-2 gap-x-20 gap-y-5">
          {ProfileFields.map((field, index) => {
            return (
              <div>
                <label className="text-2xl text-[#1A1A1A] uppercase">
                  {field.label}:
                </label>
                <div className="ml-20 flex items-center">
                  <input
                    className="bg-transparent outline-none"
                    placeholder={field.placeholder}
                  />
                  <div className=" two-color-gradient-background-vertical flex items-center px-2 rounded-full py-2 h-fit">
                    <FaPencil className="text-white " />
                  </div>
                </div>
              </div>
            );
          })}
          <div>
            <label className="text-2xl text-[#1A1A1A] uppercase">
              cnic front image:
            </label>
            <div className="ml-28 mt-5">
              <img src={DummyCnic} />
              <div className=" two-color-gradient-background-vertical absolute bottom-8 right-[66%] flex items-center px-2 rounded-full py-2 h-fit w-fit">
                <FaCamera className="text-white " />
              </div>
            </div>
          </div>
          <div>
            <label className="text-2xl text-[#1A1A1A] uppercase">
              cnic back image:
            </label>
            <div className="ml-28 mt-5">
              <img src={DummyCnic} />
              <div className=" two-color-gradient-background-vertical absolute bottom-8 right-[20%] flex items-center px-2 rounded-full py-2 h-fit w-fit">
                <FaCamera className="text-white " />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkerDashProfile;
