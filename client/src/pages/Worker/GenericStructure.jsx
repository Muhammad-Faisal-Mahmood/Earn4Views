import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useContext, useEffect } from "react";
import { fetchUserVPN } from "../../utils/FetchVPN";
import { UserContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";


const GenericStructure = () => {

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);


  const fetchData = async () => {
    const response = await fetchUserVPN();
    if (response.VPN) {
      setUser(null);
      localStorage.removeItem("e4vToken")
      toast.error(`No VPN Connection Allowed`);
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1">
        <div className="fixed w-15 md:w-52 h-full">
          <Sidebar />
        </div>
        {/* <div className="absolute w-[84%] left-[16vw] md:w-[84%] md:left-[15vw]"> */}
        <div className="flex-1 overflow-auto pl-16 md:pl-52">
          <Header className="" />
          <div className="bg-[#F9F9F9]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default GenericStructure;
