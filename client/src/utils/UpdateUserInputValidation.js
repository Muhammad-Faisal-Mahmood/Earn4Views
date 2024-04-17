import { toast } from "react-toastify";

function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function containsSpecialCharacters(str) {
  const regex = /[^a-zA-Z0-9]/;
  return regex.test(str);
}

function containsNumber(str) {
    const regex = /\d/;
    return regex.test(str);
}

const Genders = [ "male", "female", "others"];

export const ValidateUserUpdateData = (updatedFields) => {
  if (updatedFields?.Name) {
    console.log("name entered")
    if (containsNumber(updatedFields?.Name)) {
      return toast.warning("Name cannot contain a number");
    }

    if (containsSpecialCharacters(updatedFields?.Name)) {
      return toast.warning("Name cannot have a special character");
    }
  }
  if (updatedFields?.Age) {
    if (!isNumber(updatedFields?.Age)) {
      return toast.warning("Age must be a number");
    }
  }

  if (updatedFields?.CNIC) {
    if (updatedFields?.CNIC.includes("-")) {
      return toast.warning("Please enter the CNIC without the dashes");
    }
    if (!isNumber(updatedFields?.CNIC)) {
      return toast.warning("CNIC must be a number");
    }
    if (updatedFields?.CNIC.length !== 13) {
      return toast.warning("CNIC must be 13 digits long");
    }
  }

  if (updatedFields?.Phone) {
    if (updatedFields?.Phone.includes("-")) {
      return toast.warning("Please enter the Phone number without the dashes");
    }
    if (!isNumber(updatedFields?.Phone)) {
      return toast.warning("Phone number must be a number");
    }
    if (updatedFields?.Phone.length !== 11) {
      return toast.warning("Phone number must be 11 digits long");
    }
  }

  if (updatedFields?.Gender) {
    if (!Genders.includes(updatedFields?.Gender.toLowerCase())) {
      return toast.warning("Gender can either be male, female or others");
    }
  }

  return true;
};
