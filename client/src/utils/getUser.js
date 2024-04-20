import { Base_Api } from "./BaseApi";

export const getUser = async (token, setUser) => {
  const response = await fetch(Base_Api + "api/userAuth/getuser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  });

  const data = await response.json();
  if (data.success) {
    setUser({
      authToken: token,
      ...data.userData,
    });
  } else {
    console.error("data cant be managed this way");
  }
};
