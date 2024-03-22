import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const GenericStructure = () => {
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
