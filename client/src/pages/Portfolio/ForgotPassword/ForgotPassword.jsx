import { useRef, useState } from "react";
import { Base_Api } from "../../../utils/BaseApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const emailRef = useRef("");
  const otpRef = useRef("");
  const passwordRef = useRef("");
  const [otpID, setotpID] = useState(null);
  const navigate = useNavigate();

  const handleEmailOtp = async () => {
    try {
      const response = await fetch(Base_Api + "api/userAuth/SendOTPemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef.current.value,
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast(responseData.message);
        setotpID(responseData?.id);
      } else {
        // Handle errors
        toast.error(responseData.message);
        console.error("Error in response:", response.message);
      }
    } catch (error) {
      console.error("Error sending forgot password OTP:", error.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      const response = await fetch(
        Base_Api + "api/userAuth/forgetPasswordemail",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            OTPReq: otpRef.current.value,
            NewPassword: passwordRef.current.value,
            id: otpID,
          }),
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        console.log("Password Changed successfully, data: ", responseData);
        toast(responseData.message);
        navigate("/login");
      } else {
        // Handle errors
        toast.error(responseData.message);
        console.error("Error in response:", responseData.message);
      }
    } catch (error) {
      console.error("Error changing password :", error.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="w-full flex items-center justify-center  my-32 lg:my-48 xl:my-56">
        {!otpID && (
          <div className="flex flex-col gap-2 w-[40%] rounded-md shadow-basic p-12 ">
            <h1 className="text-lg font-medium">Enter Your Email</h1>
            <input
              ref={emailRef}
              className="w-full rounded-lg "
              placeholder="example@example.com"
            />
            <button
              onClick={handleEmailOtp}
              className="rounded-lg button-gradient-background mt-5  text-white w-full py-4"
            >
              Enter
            </button>
            {/* <h1 className='text-sm text-center '>Haven't Received OTP yet?<span onClick={resendOtp} className='ml-2 underline font-medium cursor-pointer'>Click Here to re-send OTP</span></h1> */}
          </div>
        )}
        {otpID && (
          <div className="flex flex-col gap-2 w-[40%] rounded-md shadow-basic p-12 ">
            <h1 className="text-lg font-medium">Enter OTP</h1>
            <input
              ref={otpRef}
              className="w-full rounded-lg "
              placeholder="check your inbox"
            />
            <h1 className="text-lg font-medium mt-2">Enter New Password</h1>
            <input
              ref={passwordRef}
              className="w-full rounded-lg"
              type="password"
            />
            <button
              onClick={handlePasswordReset}
              className="rounded-lg button-gradient-background mt-5  text-white w-full py-4 font-bold text-lg"
            >
              Change
            </button>
            {/* <h1 className='text-sm text-center '>Haven't Received OTP yet?<span onClick={resendOtp} className='ml-2 underline font-medium cursor-pointer'>Click Here to re-send OTP</span></h1> */}
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
