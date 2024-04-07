import React, { useRef, useContext } from 'react'
import { UserContext } from '../../../App';
import { Base_Api } from '../../../utils/BaseApi';


const OtpVerification = () => {
    const { user, setUser } = useContext(UserContext);
    const otpInputRef = useRef();

    const handleOtpVerification = async ()=>{
        try {
            const response = await fetch(Base_Api + "api/userAuth/verifyOTP", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: user.authToken,
                otp: otpInputRef.current.value,
              }),
            });
      
            if (response.ok) {
              try {
                const responseData = await response.json();
                console.log("OTP verified successfully, data: ", responseData);
                const userData = await fetch(Base_Api + "api/userAuth/getuser", {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      "auth-token": user.authToken,
                    },
                  });
                  if (userData.ok) {
                    try {
                      const userDataJson = await userData.json();
                      console.log("userData :", userDataJson);
                      setUser({
                        authToken: user.authToken,
                        ...userDataJson.userData,
                      });
                    } catch (e) {
                      console.log("error: ", e);
                    }
                  }
                // Handle success, maybe redirect user or show a success message
              } catch (error) {
                console.error("Error parsing JSON response:", error.message);
              }
            } else {
              // Handle errors
              console.error("Error in response:", response.message);
            }
          } catch (error) {
            console.error("Error verifying OTP:", error.message);
          }
    }

    const resendOtp = async()=>{
        try {
            const response = await fetch(Base_Api + "api/userAuth/SendOTPagain", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: user.authToken,
              }),
            });
      
            if (response.ok) {
              try {
                const responseData = await response.json();
                console.log("OTP sent again successfully, data: ", responseData);
                // Handle success, maybe redirect user or show a success message
              } catch (error) {
                console.error("Error parsing JSON response:", error.message);
              }
            } else {
              // Handle errors
              console.error("Error in response:", response.message);
            }
          } catch (error) {
            console.error("Error sending OTP again:", error.message);
          }
    }
  return (
    <div className='w-full flex items-center justify-center  my-32 lg:my-48 xl:my-56'>
        <div className='flex flex-col gap-4 rounded-md shadow-basic p-8'>
            <h1 className='text-2xl font-medium'>Your OTP has been sent to your email</h1>
            <input ref={otpInputRef} className='w-full rounded-lg text-center' placeholder='Paste Your OTP Here' />
            <button onClick={handleOtpVerification} className='rounded-lg button-gradient-background text-white w-full py-4'>Submit</button>
            <h1 className='text-sm text-center '>Haven't Received OTP yet?<span onClick={resendOtp} className='ml-2 underline font-medium cursor-pointer'>Click Here to re-send OTP</span></h1>
        </div>
    </div>
  )
}

export default OtpVerification