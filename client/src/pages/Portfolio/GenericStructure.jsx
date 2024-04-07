import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import {  useNavigate } from "react-router-dom";

const GenericStructure = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  if(user?.Role){
    user.Role === "Buyer" ? navigate("/dashboard/buyer") : navigate("/dashboard/worker")
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

GenericStructure.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GenericStructure;
