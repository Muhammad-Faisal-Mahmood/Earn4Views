import { Outlet } from "react-router-dom";
import Header from "../Header";

function Login() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Login;
