import dayjs from "dayjs";
import userProfile from "../../../assets/svg/profile-user.svg";
import { FaPencil } from "react-icons/fa6";
import DummyCnic from "../../../assets/svg/WorkerProfileCnic.svg";
import { FaCamera } from "react-icons/fa";
import { UserContext } from "../../../App";
import { useContext, useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Base_Api } from "../../../utils/BaseApi";
import { ToastContainer, toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { ValidateUserUpdateData } from "../../../utils/UpdateUserInputValidation";

const BuyerDashProfile = () => {
  const { user, setUser } = useContext(UserContext);

  const [enabledFields, setEnabledFields] = useState({});
  const [focusedIndex, setfocusedIndex] = useState(null);
  const [CNICFrontImage, setCNICFrontImage] = useState(null);
  const [CNICBackImage, setCNICBackImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const focusedInputs = useRef([]);

  console.log("user data:",user)

  const [fields, setFields] = useState({
    Name: user?.Name || "",
    Phone: user?.Phone || "",
    Age: user?.Age || "",
    Gender: user?.Gender || "",
    Email: user?.Email || "",
    CNIC: user?.CNIC || "",
  });

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
    if (Object.keys(fields)[index] == "Email") {
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

    if (Object.keys(updatedFields).length === 0 && !profileImage) {
      toast.warning("Please provide us the right information");
      return;
    }

    if(profileImage){
      handleProfileImageUpload();
    }

    if (ValidateUserUpdateData(updatedFields) !== true) {
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

  //adding files to useState for updating cnic and profile img
  const handleImageUpload = (event, imageType) => {
    const file = event.target.files[0];
    if (!file || !file.type.match("image/*")) {
      toast.warning("Please select a valid image file.");
      return;
    }

    if (imageType === "front") {
      setCNICFrontImage(file);
    } else if (imageType === "back") {
      setCNICBackImage(file);
    } else if (imageType === "profile") {
      setProfileImage(file);
      // handleProfileImageUpload();
    }
  };

  //updating cnic
  const handleCnicUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (CNICFrontImage) {
      formData.append("CNIC_Front", CNICFrontImage);
    }
    if (CNICBackImage) {
      formData.append("CNIC_Back", CNICBackImage);
    }

    try {
      const response = await fetch(
        `${Base_Api}api/userAuth/UpdateCNIC`,
        {
          method: "PUT",
          body: formData, // Send FormData for image uploads
          headers: {
            "auth-token": user.authToken,
          },
        }
      );

      const data = await response.json();
      setCNICFrontImage(null);
      setCNICBackImage(null);
      if (data?.success) {
        toast.success("CNIC updated successfully");
      } else {
        toast.message(data.message);
      }
    } catch (error) {
      // Handle network or other errors
      toast.error(error.message);
    }
  };

  //updating profile img
  const handleProfileImageUpload = async () => {
    const formData = new FormData();
    
    formData.append("Proimg", profileImage);
    try {
      const response = await fetch(
        `${Base_Api}api/userAuth/UpProImg`,
        {
          method: "PUT",
          headers: {
            "auth-token": user.authToken,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (data?.success) {
        getProfileImage();
        toast.success("Profile photo updated successfully");

      } else {
        toast.message(data.message);
      }
    } catch (error) {
      // Handle network or other errors
      toast.error(error.message);
    }
  };

  const getProfileImage = async () => {
    if(!user) return;
    try {
      const response = await fetch(
          `${Base_Api}api/userAuth/getProImg`,
        {
          method: "GET",
          headers: {
            "auth-token": user.authToken,
          },
        }
      );

      const data = await response.json();
      if (data?.success) {
        if (data?.user?.ProfilePhoto) {
          setUser((prevUser) => ({
            ...prevUser,
            ProfilePhoto: data.user.ProfilePhoto,
          }));
        }
      } else {
        toast.message(data.message);
      }
    } catch (error) {
      // Handle network or other errors
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProfileImage()
  }, [user])
  
console.log("profile photo url",`${Base_Api + "uploads/"+ user?.ProfilePhoto}`)
console.log("cnic url",`${Base_Api + "uploads/"+ user?.CNIC_Front}`)
  return (
    <>
      <ToastContainer />
      <div className="mx-[7vw] flex flex-col lg:py-10">
        <div className="hidden lg:block">
          <h1 className="text-3xl font-bold">
            Hello,
            <span className="capitalize">{`${user?.Name?.split(" ")[0]}`}</span>!
          </h1>
          <p className="text-gray-500">
            {dayjs().format("dddd MMMM DD, YYYY")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative rounded-full w-20 h-20 md:w-40 md:h-40 flex justify-center items-center">
            {!user?.ProfilePhoto && <FaUserCircle size={120} className="text-slate-400" />}
           {user?.ProfilePhoto && <img src={`${Base_Api + "uploads/" + user?.ProfilePhoto}`} className="md:size-36 rounded-full size-20" />}

            <div className=" two-color-gradient-background-vertical flex p-2 rounded-full absolute  -bottom-2 -right-2 md:bottom-3 md:right-6 ">
              <label htmlFor="profile-image">
                <FaCamera className="text-white cursor-pointer" />
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleImageUpload(e, "profile")}
              />
            </div>

            {/* if the image is dynamically fetched:  */}
          </div>
          <h1 className="font-bold text-[#1A1A1A] mt-2 text-2xl lg:text-4xl capitalize md:mt-0">
            {`${user?.Name}`}
          </h1>
        </div>

        <div>
          <form>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5">
              {ProfileFields.map((field, index) => {
                return (
                  <div key={index}>
                    <label className="text-sm font-semibold md:text-2xl text-[#1A1A1A] uppercase">
                      {field.label}:
                    </label>
                    <div className="md:ml-20 flex items-center">
                      <input
                        ref={(ref) => (focusedInputs.current[index] = ref)}
                        className={
                          index === focusedIndex
                            ? `bg-transparent mr-4 rounded-lg bg-gray-100 w-full`
                            : `bg-transparent mr-4 rounded-lg bg-gray-100 cursor-default outline-none w-full`
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
            </div>
            <div className="col-span-2 my-6 flex items-center justify-center">
              <button
                onClick={handleUserUpdate}
                className="py-2 px-4  md:py-4 md:px-12 font-bold text-lg md:text-2xl text-white rounded-lg button-gradient-background"
              >
                Update Info
              </button>
            </div>

            <div className="flex gap-4 flex-col lg:flex-row lg: justify-around">
              <div className="flex flex-col gap-2">
                <label className="text-lg md:text-2xl text-[#1A1A1A] uppercase md:my-4">
                  cnic front image:
                </label>
                <div className="w-full flex justify-center ">
                  <div className="relative">
                    <img src={user?.CNIC_Front ? `${Base_Api +  "uploads/"+ user?.CNIC_Front}` :DummyCnic} className={user?.CNIC_Front? "size-48" : " "}/>
                    <div className=" two-color-gradient-background-vertical flex p-2 rounded-full absolute -bottom-2 -right-2 ">
                      <label htmlFor="cnic-front">
                        <FaCamera className="text-white cursor-pointer" />
                      </label>
                      <input
                        id="cnic-front"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => handleImageUpload(e, "front")}
                      />
                      {/* <FaCamera className="text-white" /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg md:text-2xl text-[#1A1A1A] uppercase md:my-4">
                  cnic back image:
                </label>
                <div className="w-full flex justify-center ">
                  <div className="relative">
                  <img src={user?.CNIC_Back ? `${Base_Api+ "uploads/"+ user?.CNIC_Back}` :DummyCnic} className={user?.CNIC_Back? "size-48" : " "} />
                    <div className=" two-color-gradient-background-vertical flex p-2 rounded-full absolute -bottom-2 -right-2 ">
                      <label htmlFor="cnic-back">
                        <FaCamera className="text-white cursor-pointer" />
                      </label>
                      <input
                        id="cnic-back"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => handleImageUpload(e, "back")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="col-span-2 my-6 flex items-center justify-center">
            <button
              onClick={handleCnicUpdate}
              className=" py-2 px-4  md:py-4 md:px-12 font-bold text-lg md:text-2xl text-white rounded-lg button-gradient-background"
            >
              Update CNIC
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerDashProfile;
