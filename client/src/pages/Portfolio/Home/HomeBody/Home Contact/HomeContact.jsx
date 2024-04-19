import contactCall from "../../../../../assets/svg/contact-call.svg";
import PositionCard from "../../../../../components/PositionCard";

const HomeContact = () => {
  return (
    <div className="my-12 md:my-20">
      <h1 className="my-8 md:my-20 text-center text-2xl md:text-4xl font-bold uppercase">
        Contact Us
      </h1>
      <div className="shadow-basic mx-4 md:mx-8 lg:mx-20 py-8 md:py-12 lg:py-20 px-8 md:px-10 rounded-2xl flex gap-10">
        <div className="w-full lg:w-[45%]">
          <div className="flex flex-col gap-3 mb-16">
            <h1 className="text-3xl md:text-4xl font-bold">
              Let us know your concerns.
            </h1>
            <p className="text-xl md:text-2xl text-gray-500">
              First please give us some context.
            </p>
          </div>
          <div className="border-t-2  border-gray-400" />
          <div className="my-2">
            <form action="" className="flex w-full gap-4  flex-col">
              <div className="flex flex-col gap-1">
                <h1 className="text-left">Name:</h1>
                <input
                  type="text"
                  className="px-4 py-3 shadow-lg rounded-md bg-transparent"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-left">Email:</h1>
                <input
                  type="email"
                  className="px-4 py-3 shadow-lg rounded-md bg-transparent w-full"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-left">Subject:</h1>
                <input
                  type="text"
                  className="px-4 py-3 shadow-lg w-full bg-transparent rounded-md"
                  placeholder="Example: Facebook likes"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-left">Message:</h1>
                <textarea
                  className="px-4 py-3 shadow-lg rounded-md w-full"
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
        <div className="hidden lg:flex w-[55%]  flex-col lg:gap-28 gap-12">
          <div className="flex flex-col gap-12">
            <h1 className="text-2xl font-bold my-4">3 steps to solutions</h1>
            <div className="flex gap-2">
              <PositionCard
                gradient={true}
                stepNumber={"1"}
                text={"Fill out the support form"}
              />
              <PositionCard
                stepNumber={"2"}
                text={"You wait, we'll get started"}
              />
              <PositionCard stepNumber={"3"} text={"Get your solution"} />
            </div>
          </div>
          <div className="shadow-basic p-8 pb-24 flex rounded-lg relative">
            <div className="w-[50%] lg:w-[70%] flex flex-col gap-4">
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
