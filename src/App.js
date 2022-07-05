/* eslint-disable linebreak-style */
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/signin/signIn";
import SignUp from "./pages/signup/signup.jsx";

import Home from "./pages/home/home.jsx";
import ViewAll from "./pages/viewAll/viewAll";
import Detail from "./pages/moviedetail/moviedetail.jsx";
import OrderPage from "./pages/order/order";
import Payment from "./pages/payment/payment";
import PrivateRoute from "./helper/route/privateRoute";
import PublicRoute from "./helper/route/publicRoute";
import ManageMovie from "./pages/manageMovie/manageMovie";
import ManageSchedule from "./pages/manageSchedule/manageSchedule";
import Forgot from "./pages/forgot/forgot";
import Profile from "./pages/profile/profile";
import Dashboard from "./pages/dashboard/dashboard";
import Ticket from "./pages/ticket/ticket";
import Reset from "./pages/reset/reset";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute restricted={true} />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/forgotPassword" element={<Forgot />} />
          <Route path="/resetPassword/:id" element={<Reset />} />
        </Route>

        <Route element={<PrivateRoute isAdmin={true} />}>
          <Route path="/manageMovie" element={<ManageMovie />} />
          <Route path="/manageSchedule" element={<ManageSchedule />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<PrivateRoute isAdmin={false} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/viewall" element={<ViewAll />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/moviedetail/:id" element={<Detail />} />
          <Route path="/orderpage" element={<OrderPage />} />
          <Route path="/paymentpage" element={<Payment />} />
          <Route path="/ticket" element={<Ticket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
