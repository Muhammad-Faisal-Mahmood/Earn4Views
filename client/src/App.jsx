import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Portfolio/Home";
import HomeBody from "./pages/Portfolio/Home/HomeBody";
import LoginBody from "./pages/Portfolio/Login/LoginBody";
import BuyersBody from "./pages/Portfolio/Buyers/BuyersBody/BuyersBody";
import WorkersBody from "./pages/Portfolio/Workers/WorkersBody/WorkersBody";
import ScrollToTop from "./components/ScrollToTop";
import WorkerDashHome from "./pages/Worker/Home/WorkerDashHome.jsx";
import WorkerProfile from "./pages/Worker/Profile";
import WorkerWithdraw from "./pages/Worker/Withdraw";
import YoutubeViewEarning from "./pages/Worker/Earning/YoutubeView";
import YoutubeWatchTimeEarning from "./pages/Worker/Earning/YoutubeWatchTime";
import GoogleViewEarning from "./pages/Worker/Earning/GoogleView";
import GoogleAdViewEarning from "./pages/Worker/Earning/GoogleAdView";
import WorkerDashboard from "./pages/Worker/WorkerDashboard/index.jsx";
import BuyerDashboard from "./pages/Buyer/BuyerDasboard/index.jsx";
import BuyerDashHome from "./pages/Buyer/Home/index.jsx";
import BuyerDashProfile from "./pages/Buyer/Profile/index.jsx";
import BuyerDashTransactions from "./pages/Buyer/Transactions/index.jsx";
import BuyerDashNewServices from "./pages/Buyer/NewServices/index.jsx";
import OtpVerification from "./pages/Portfolio/OtpVerification/OtpVerification.jsx";
import { createContext, useState } from "react";
import ForgotPassword from "./pages/Portfolio/ForgotPassword/ForgotPassword.jsx";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<HomeBody />} />
            <Route path="login" element={<LoginBody />} />
            <Route path="buyers" element={<BuyersBody />} />
            <Route path="workers" element={<WorkersBody />} />
            <Route path="otp-verification" element={<OtpVerification />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/dashboard/worker" element={<WorkerDashboard />}>
            <Route index element={<WorkerDashHome />} />
            <Route path="profile" element={<WorkerProfile />} />
            <Route path="withdraw" element={<WorkerWithdraw />} />
            <Route
              path="earning/youtube/view"
              element={<YoutubeViewEarning />}
            />
            <Route
              path="earning/youtube/watchtime"
              element={<YoutubeWatchTimeEarning />}
            />
            <Route path="earning/google/view" element={<GoogleViewEarning />} />
            <Route
              path="earning/google/adview"
              element={<GoogleAdViewEarning />}
            />
          </Route>
          <Route path="/dashboard/buyer" element={<BuyerDashboard />}>
            <Route index element={<BuyerDashHome />} />
            <Route path="profile" element={<BuyerDashProfile />} />
            <Route path="transactions" element={<BuyerDashTransactions />} />
            <Route path="new-services" element={<BuyerDashNewServices />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
