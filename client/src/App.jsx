import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Portfolio/Home";
import HomeBody from "./pages/Portfolio/Home/HomeBody";
import LoginBody from "./pages/Portfolio/Login/LoginBody";
import BuyersBody from "./pages/Portfolio/Buyers/BuyersBody/BuyersBody";
import WorkersBody from "./pages/Portfolio/Workers/WorkersBody/WorkersBody";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomeBody />} />
          <Route path="login" element={<LoginBody />} />
          <Route path="buyers" element={<BuyersBody />} />
          <Route path="workers" element={<WorkersBody />} />
        </Route>
        <Route
          path="/worker"
          element={
            <div>
              worker header <Outlet />
            </div>
          }
        >
          <Route index element={<div>worker home</div>} />
          <Route path="my-id" element={<div>Worker my id</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
