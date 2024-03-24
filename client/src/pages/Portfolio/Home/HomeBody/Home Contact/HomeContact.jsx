import PositionCard from "./PositionCard";
import contactCall from "../../../../../assets/svg/contact-call.svg";

const HomeContact = () => {
  return (
    <div className="my-20">
      <h1 className="my-20 text-center text-4xl font-bold uppercase">
        Contact Us
      </h1>
      <div className="shadow-basic mx-20 py-20 px-10 rounded-lg flex gap-10">
        <div className="w-[45%]">
          <div className="flex flex-col gap-3 mb-16">
            <h1 className="text-4xl font-bold">Let us know your concerns.</h1>
            <p className="text-2xl text-gray-500">
              First please give us some context.
            </p>
          </div>
          <div className="border-t-2 border-gray-400" />
          <div className="my-2">
            <form action="" className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h1>Name:</h1>
                <input
                  type="text"
                  className="px-4 py-3 shadow-md rounded-sm w-full"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1>Email:</h1>
                <input
                  type="email"
                  className="px-4 py-3 shadow-md rounded-sm w-full"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1>Subject:</h1>
                <input
                  type="text"
                  className="px-4 py-3 shadow-md rounded-sm w-full"
                  placeholder="Example: Facebook likes"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1>Message:</h1>
                <textarea
                  className="px-4 py-3 shadow-md rounded-sm w-full"
                  name=""
                  id=""
                  placeholder="message..."
                  cols="30"
                  rows="3"
                ></textarea>
              </div>
              <div>
                <button className="w-full button-gradient-background text-white py-4 font-bold text-2xl rounded-sm">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[55%] flex flex-col gap-28">
          <div className="flex flex-col gap-12">
            <h1 className="text-2xl font-bold my-4">3 steps to solutions</h1>
            <div className="flex gap-2">
              <PositionCard
                gradient={true}
                stepNumber={"01"}
                text={"Fill out the support form"}
              />
              <PositionCard
                stepNumber={"02"}
                text={"You wait, we'll get started"}
              />
              <PositionCard stepNumber={"03"} text={"Get your solution"} />
            </div>
          </div>
          <div className="shadow-basic p-8 pb-24 flex rounded-lg relative">
            <div className="w-[70%] flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Special Request?</h1>
              <p className="text-xl">
                Is your page not accessible or is displayed completely
                incorrectly? Then call us directly!
              </p>
            </div>
            <div>
              <img className="absolute bottom-0" src={contactCall} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContact;
