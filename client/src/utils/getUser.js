import { Base_Api } from "./BaseApi";

export const getUser = async (token) => {
  try {
    const response = await fetch(Base_Api + "api/userAuth/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    if (data.success) {
      console.log("fetched data: ", data.userData);
      return data.userData;
    } else {
      console.error("data cant be managed this way");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

