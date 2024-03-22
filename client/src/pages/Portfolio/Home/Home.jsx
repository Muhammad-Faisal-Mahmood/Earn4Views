import { Outlet } from "react-router-dom";
import Header from "../Header";

function Home() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Home;
