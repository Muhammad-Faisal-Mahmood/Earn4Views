import { useRef, useState, useContext } from "react";
import circle from "../../../../assets/svg/circle1.svg";
import polygon from "../../../../assets/svg/polygon1.svg";
import Polygonrev from "../../../../assets/svg/polygon2.svg";
import { Base_Api } from "../../../../utils/BaseApi";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginBody = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSignIn, setisSignIn] = useState(true);
  const [userRole, setuserRole] = useState("");
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const loginEmailRef = useRef("");
  const loginPasswordRef = useRef("");
  console.log("user context: ", user);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Make sure password and confirm password match
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast.warning("Passwords don't match");
      return;
    }

    if (passwordRef.current.value.length < 8) {
      toast.warning("Password should be 8 characters long");
      return;
    }

    try {
      const response = await fetch(Base_Api + "api/userAuth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: nameRef.current.value,
          Email: emailRef.current.value,
          Role: userRole,
          Password: passwordRef.current.value,
        }),
      });

      if (response.ok) {
        try {
          const responseData = await response.json();
          console.log("User created successfully, data: ", responseData);

          if (responseData.AuthToken) {
            // If AuthToken exists, navigate to 'otp-verification' route
            setUser({
              authToken: responseData.AuthToken,
            });
            navigate("/otp-verification");
          }
          // Handle success, maybe redirect user or show a success message
        } catch (error) {
          console.error("Error parsing JSON response:", error.message);
        }
      } else {
        // Handle errors
        const responseData = await response.json();
        toast.error(responseData.error);
        console.error("Error creating user:", responseData.error);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(Base_Api + "api/userAuth/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: loginEmailRef.current.value,
          Password: loginPasswordRef.current.value,
        }),
      });

      if (response.ok) {
        try {
          const responseData = await response.json();
          console.log("User loggedin successfully, data: ", responseData);

          if (responseData.AuthToken) {
            console.log("logged in user auth token: ", responseData.AuthToken);
            const userData = await fetch(Base_Api + "api/userAuth/getuser", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "auth-token": responseData.AuthToken,
              },
            });
            if (userData.ok) {
              try {
                const userDataJson = await userData.json();
                console.log("userData :", userDataJson);
                setUser({
                  authToken: responseData.AuthToken,
                  ...userDataJson.userData,
                });
              } catch (e) {
                console.log("Error fetching user data: ", e);
              }
            }
          }
          // Handle success, maybe redirect user or show a success message
        } catch (error) {
          console.error("Error parsing JSON response:", error.message);
        }
      } else {
        const responseData = await response.json();
        toast.error(responseData.Message);
        console.error("Error logging in user:", responseData.Message);
      }
    } catch (error) {
      console.log("Use case not handled from backend");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className=" flex justify-center w-full mt-32 lg:mt-48 xl:mt-56">
        <div className="w-[50%] text-center">
          {isSignIn && (
            <h1 className="uppercase text-2xl lg:text-4xl xl:text-5xl ">
              log in to your <span className="purple-text"> Earn 4 Views </span>
              account
            </h1>
          )}
          {!isSignIn && (
            <h1 className="uppercase text-2xl lg:text-4xl xl:text-5xl ">
              sign up to your{" "}
              <span className="purple-text"> Earn 4 Views </span>
              account
            </h1>
          )}
        </div>
      </div>
      <div
        //   className={`w-[80%] md:w-[90%] lg:w-[80%] xl:w-[70%] ${
        //     isSignIn ? "min-h-[750px]" : "min-h-[630px]"
        //   }  md:min-h-[820px] m-auto py-20 flex  container2 my-16 lg:my-32 xl:my-40`}
        //   id="container"
        // >
        className={`w-[80%] md:w-[90%] lg:w-[80%] xl:w-[70%] min-h-[750px] md:min-h-[820px] m-auto py-20 flex  container2 my-16 lg:my-32 xl:my-40`}
        id="container"
      >
        <div
          className="py-10 md:py-20 form-container sign-up-container sm:translate-x-0 w-[100%] md:w-[60%]"
          id="SignUp"
        >
          <form onSubmit={handleSignUp} className="sm:px-10 form ">
            <h1 className="text-black font-Para text-2xl md:text-4xl font-bold mb-3">
              Create Account
            </h1>
            {/* <h2 className="text-black font-Para text-xl font-light">
              Sign Up With
            </h2> */}
            {/* <div className="flex flex-row gap-6 social-container my-4">
              <img src={google} alt="" className="w-[50px] h-[50px]" />
              <img src={facebook} alt="" className="w-[50px] h-[50px]" />
            </div> */}
            {/* <div className="font-Para text-black text-2xl font-bold my-2">
              Or
            </div> */}
            <div className="flex flex-col mt-10 gap-4 text-left items-start w-[80%] m-auto">
              <div className="font-Para flex flex-col gap-2 text-black font-semibold w-[100%]">
                <label htmlFor="" className="text-xl">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="py-2 px-4 bg-white rounded-lg text-lg placeholder:text-gray-400"
                  style={{ boxShadow: "1px 0px 12px 1px #00000040" }}
                  ref={nameRef}
                />
              </div>
              <div className="font-Para flex flex-col gap-2 text-black font-semibold w-[100%]">
                <label htmlFor="" className="text-xl">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="py-2 px-4 bg-white rounded-lg text-lg placeholder:text-gray-400"
                  style={{ boxShadow: "1px 0px 12px 1px #00000040" }}
                  ref={emailRef}
                />
              </div>
              <div className="font-Para flex flex-col gap-2 text-black font-semibold w-[100%]">
                <label htmlFor="" className="text-xl">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Your Password"
                  className="py-2 px-4 bg-white rounded-lg text-lg placeholder:text-gray-400"
                  style={{ boxShadow: "1px 0px 12px 1px #00000040" }}
                  ref={passwordRef}
                />
              </div>
              <div className="font-Para flex flex-col gap-2 text-black font-semibold w-[100%]">
                <label htmlFor="" className="text-xl">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="py-2 px-4 bg-white rounded-lg text-lg placeholder:text-gray-400"
                  style={{ boxShadow: "1px 0px 12px 1px #00000040" }}
                  ref={confirmPasswordRef}
                />
              </div>
              <div className="flex flex-col gap-4 text-black font-semibold w-[100%]">
                <label className="text-xl">Account Type</label>
                <div className="flex gap-6 justify-center items-center">
                  <label htmlFor="worker" className="flex items-center text-lg">
                    <input
                      type="radio"
                      id="worker"
                      name="accountType"
                      value="worker"
                      className="mr-2 accent-[#532280]"
                      onChange={() => setuserRole("Worker")}
                    />
                    Worker
                  </label>
                  <label htmlFor="buyer" className="flex items-center text-lg">
                    <input
                      type="radio"
                      id="buyer"
                      name="accountType"
                      value="buyer"
                      className="mr-2 accent-[#532280]"
                      onChange={() => setuserRole("Buyer")}
                    />
                    Buyer
                  </label>
                </div>
              </div>
              <div className="flex justify-center w-[100%]">
                <button
                  type="submit"
                  className="font-Para w-fit m-auto my-4 bg-black bg-opacity-80 hover:bg-opacity-100 text-white rounded-lg text-xl md:text-xl font-bold py-2 px-6 hover:bg-accence  duration-300 ease-in-out"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
        <div
          className="py-10 md:py-20 form-container sign-in-container sm:translate-x-0 w-[100%] md:w-[60%]"
          id="SignIn"
        >
          <form onSubmit={handleLogin} className="sm:px-10 form">
            <h1 className="text-black font-Para text-2xl md:text-4xl font-bold mb-3">
              Login To Your Account
            </h1>
            {/* <h2 className="text-black font-Para text-xl font-light">
              Login with
            </h2> */}
            {/* <div className="flex flex-row gap-6 social-container my-4">
              <img src={google} alt="" className="w-[50px] h-[50px]" />
              <img src={facebook} alt="" className="w-[50px] h-[50px]" />
            </div> */}
            {/* <div className="font-Para text-black text-2xl font-bold my-2">
              Or
            </div> */}
            <div className="flex flex-col gap-4 mt-10 text-left items-start w-[80%] ">
              <div className="font-Para flex flex-col gap-2 text-black font-semibold w-[100%]">
                <label htmlFor="" className="text-xl">
                  Email
                </label>
                <input
                  type="email"
                  ref={loginEmailRef}
                  placeholder="Your Email"
                  className="py-2 px-4 bg-white rounded-lg text-lg placeholder:text-gray-400"
                  style={{ boxShadow: "1px 0px 12px 1px #00000040" }}
                />
              </div>
              <div className="font-Para flex flex-col gap-2 text-black font-semibold w-[100%]">
                <label htmlFor="" className="text-xl">
                  Password
                </label>
                <input
                  type="password"
                  ref={loginPasswordRef}
                  placeholder="Your Password"
                  className="py-2 px-4 bg-white rounded-lg text-lg placeholder:text-gray-400"
                  style={{ boxShadow: "1px 0px 12px 1px #00000040" }}
                />
              </div>
              <Link to={"/forgot-password"}>
                <h1 className="text-blue-600 font-medium cursor-pointer hover:underline">
                  Forgot Password?
                </h1>
              </Link>
              <div className="flex justify-center w-[100%]">
                <button
                  type="submit"
                  className="font-Para w-fit m-auto my-4 hover:bg-opacity-100 bg-black bg-opacity-80 text-white rounded-lg text-xl md:text-xl font-bold py-2 px-6 hover:bg-accence duration-300 ease-in-out"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
          <div className="p-4">
            <h1
              onClick={() => {
                setisSignIn(!isSignIn);
                const container = document.getElementById("container");
                container.classList.add("right-panel-active");
              }}
              className="text-center underline text-blue-700 cursor-pointer"
            >
              Please sign up here if you don&apos;t have account already!
            </h1>
          </div>
        </div>

        <div className="overlay-container hidden md:block">
          <img
            src={circle}
            alt=""
            className="absolute z-50 right-[-20%] top-[5%] w-[100px] xl:w-[150px]"
          />
          <img
            src={polygon}
            alt=""
            className="absolute z-50 left-[10%] top-[10%] lg:top-[20%]  w-[100px] xl:w-[150px]"
          />
          <img
            src={Polygonrev}
            alt=""
            className="absolute z-50 left-[-5%] bottom-[20%] w-[100px] xl:w-[100px]"
          />
          <img
            src={circle}
            alt=""
            className="absolute z-50 right-[10%] lg:right-[15%] bottom-[5%] lg:bottom-[15%] w-[150px] xl:w-[200px]"
          />
          <div className="overlay two-color-gradient-background">
            <div className="overlay-panel overlay-left">
              <h1 className="text-WHITE font-Para text-4xl font-bold mb-3">
                New Here?
              </h1>
              <p className="text-white font-Para text-lg">
                Sign up and discover a great amount of new oppurtunities
              </p>
              <button
                className="uppercase my-10 py-2 px-8 rounded-full bg-transparent border-2 border-white text-xl font-Para font-bold hover:bg-white hover:text-black ease-in-out duration-300"
                onClick={() => {
                  // StateSet("log in to your slice list account");
                  setisSignIn(!isSignIn);
                  const container = document.getElementById("container");
                  container.classList.remove("right-panel-active");
                }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="text-WHITE font-Para text-4xl font-bold mb-3">
                Welcome back
              </h1>
              <p className="text-white font-Para text-lg">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="uppercase my-10 py-2 px-8 rounded-full bg-transparent border-2 border-white text-xl font-Para font-bold hover:bg-white hover:text-black ease-in-out duration-300"
                onClick={() => {
                  // StateSet("sign up to your slice list account");
                  setisSignIn(!isSignIn);
                  const container = document.getElementById("container");
                  container.classList.add("right-panel-active");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginBody;
