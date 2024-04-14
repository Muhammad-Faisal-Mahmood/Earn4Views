import dayjs from "dayjs";
import userProfile from "../../../assets/svg/profile-user.svg";
import { FaPencil } from "react-icons/fa6";
import DummyCnic from "../../../assets/svg/WorkerProfileCnic.svg";
import { FaCamera } from "react-icons/fa";
import { UserContext } from "../../../App";
import { useContext, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Base_Api } from "../../../utils/BaseApi";
import { ToastContainer, toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { ValidateUserUpdateData } from "../../../utils/UpdateUserInputValidation";

const BuyerDashProfile = () => {
  const { user, setUser } = useContext(UserContext);

  const [enabledFields, setEnabledFields] = useState({});
  const [focusedIndex, setfocusedIndex] = useState(null);
  const focusedInputs = useRef([]);

  const [fields, setFields] = useState({
    Name: user?.Name || "",
    Phone: user?.Phone || "",
    Age: user?.Age || "",
    Gender: user?.Gender || "",
    Email: user?.Email || "",
    CNIC: user?.CNIC || "",
  });
  console.log("buyer profile user:", user);

  const ProfileFields = [
    { label: "user name", placeholder: "Codyfisher", fieldName: "Name" },
    { label: "phone number", placeholder: "123 456 7890", fieldName: "Phone" },
    { label: "Age", placeholder: "20", fieldName: "Age" },
    { label: "gender", placeholder: "female", fieldName: "Gender" },
    { label: "email", placeholder: "Codyfisher@gmail.com", fieldName: "Email" },
    { label: "cnic", placeholder: "123 456 7890 3", fieldName: "CNIC" },
  ];

  //toggle the field to enabled and not enabled
  const toggleField = (index) => {
    
    if(Object.keys(fields)[index] == "Email") {
      return;
    }

    if (focusedIndex === null) {
      setfocusedIndex(index);
    } else setfocusedIndex(null);
    focusedInputs.current[index].focus();
    setEnabledFields((prevFields) => ({
      ...prevFields,
      [index]: !prevFields[index],
    }));
  };

  // Function to update a specific field
  const updateField = (fieldName, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const updatedFields = Object.keys(fields).reduce((acc, key) => {
      if (fields[key] !== user[key] && fields[key] != "") {
        acc[key] = fields[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      toast.warning("Please provide us the right information");
      return;
    }

    if(ValidateUserUpdateData(updatedFields) !== true){
      return;
    }

    try {
      const response = await fetch(Base_Api + "api/userAuth/UpdateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": user.authToken,
        },
        body: JSON.stringify(updatedFields),
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast("User information updated successfully");
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
      } else {
        toast.error("Error updating details");
      }

      console.log("User information updated successfully:", responseData);

      //update user by fetching user data again
    } catch (error) {
      console.error("Error updating user information:", error.message);
    }

    console.log("updated fields: ", updatedFields);
  };

  return (
    <>
      <ToastContainer />
      <div className="mx-[7vw]  flex flex-col gap-8 py-10">
        <div className="flex flex-col absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div className="rounded-full  w-40 h-40 flex justify-center items-center">
            <FaUserCircle size={120} className="text-slate-400" />

            {/* if the image is dynamically fetched:  */}
            {/* <img src={userProfile} className="size-36" /> */}
          </div>
          <h1 className="font-bold text-[#1A1A1A] text-4xl capitalize">
          {`${user?.Name.split(" ")[0]}`}
          </h1>
        </div>
        <div>
          <h1 className="text-3xl font-bold">
            Hello,{" "}
            <span className="capitalize">{`${user?.Name.split(" ")[0]}`}</span>!
          </h1>
          <p className="text-gray-500">
            {dayjs().format("dddd MMMM DD, YYYY")}
          </p>
        </div>

        <div className=" mt-48">
          <form className="grid grid-cols-2 gap-x-20 gap-y-5">
            {ProfileFields.map((field, index) => {
              return (
                <div key={index}>
                  <label className="text-2xl text-[#1A1A1A] uppercase">
                    {field.label}:
                  </label>
                  <div className="ml-20 flex items-center">
                    <input
                      ref={(ref) => (focusedInputs.current[index] = ref)}
                      className={
                        index === focusedIndex
                          ? `bg-transparent mr-4 rounded-lg bg-gray-100`
                          : `bg-transparent mr-4 rounded-lg bg-gray-100 cursor-default outline-none`
                      }
                      placeholder={field.placeholder}
                      value={fields[field.fieldName]}
                      readOnly={!enabledFields[index]}
                      onChange={(e) =>
                        updateField(field.fieldName, e.target.value)
                      }
                    />
                    <div
                      onClick={() => toggleField(index)}
                      className="two-color-gradient-background-vertical flex items-center px-2 rounded-full py-2 h-fit cursor-pointer"
                    >
                      {!enabledFields[index] ? (
                        <FaPencil className="text-white" />
                      ) : (
                        <FaCheck className="text-white" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="col-span-2 my-6 flex items-center justify-center">
              <button
                onClick={handleUserUpdate}
                className=" py-4 px-12 font-bold text-2xl text-white rounded-lg button-gradient-background"
              >
                Update Info
              </button>
            </div>
            <div className="relative">
              <label className="text-2xl text-[#1A1A1A] uppercase">
                cnic front image:
              </label>
              <div className="ml-28 mt-5">
                <img src={DummyCnic} />
                <div className=" two-color-gradient-background-vertical absolute -bottom-4 left-[55%] flex items-center px-2 rounded-full py-2 h-fit w-fit">
                  <FaCamera className="text-white " />
                </div>
              </div>
            </div>
            <div className="relative">
              <label className="text-2xl text-[#1A1A1A] uppercase">
                cnic back image:
              </label>
              <div className="ml-28 mt-5">
                <img src={DummyCnic} />
                <div className=" two-color-gradient-background-vertical absolute -bottom-4 right-[38%] flex items-center px-2 rounded-full py-2 h-fit w-fit">
                  <FaCamera className="text-white " />
                </div>
              </div>
            </div>
          </form>
          <div className="col-span-2 my-6 flex items-center justify-center">
            <button className=" py-4 px-12 font-bold text-2xl text-white rounded-lg button-gradient-background">
              Update CNIC
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerDashProfile;
