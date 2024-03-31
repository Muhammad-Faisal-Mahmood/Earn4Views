import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Portfolio/Home";
import HomeBody from "./pages/Portfolio/Home/HomeBody";
import LoginBody from "./pages/Portfolio/Login/LoginBody";
import BuyersBody from "./pages/Portfolio/Buyers/BuyersBody/BuyersBody";
import WorkersBody from "./pages/Portfolio/Workers/WorkersBody/WorkersBody";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./pages/Worker/Dashboard/index.jsx";
import WorkerDashHome from "./pages/Worker/Home/WorkerDashHome.jsx";
import WorkerProfile from "./pages/Worker/Profile";
import WorkerWithdraw from "./pages/Worker/Withdraw";
import YoutubeViewEarning from "./pages/Worker/Earning/YoutubeView";
import YoutubeWatchTimeEarning from "./pages/Worker/Earning/YoutubeWatchTime";
import GoogleViewEarning from "./pages/Worker/Earning/GoogleView";
import GoogleAdViewEarning from "./pages/Worker/Earning/GoogleAdView";

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
        <Route path="/worker" element={<Dashboard />}>
          <Route index element={<WorkerDashHome />} />
          <Route path="profile" element={<WorkerProfile />} />
          <Route path="withdraw" element={<WorkerWithdraw />} />
          <Route path="earning/youtube/view" element={<YoutubeViewEarning />} />
          <Route
            path="earning/youtube/watchtime"
            element={<YoutubeWatchTimeEarning />}
          />
          <Route path="earning/google/view" element={<GoogleViewEarning />} />
          <Route path="earning/google/adview" element={<GoogleAdViewEarning />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
