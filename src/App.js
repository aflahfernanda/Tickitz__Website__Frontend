/* eslint-disable linebreak-style */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicCounter from "./pages/basic/Counter/classComponent";
import BasicReact from "./pages/basic/React";
import SignIn from "./pages/signin/signIn";
import SignUp from "./pages/signup/signup.jsx";
import BasicLogin from "./pages/basic/login";
import Home from "./pages/home/home.jsx";
import ViewAll from "./pages/viewAll/viewAll";
import Detail from "./pages/moviedetail/moviedetail.jsx";
import OrderPage from "./pages/order/order";
import Payment from "./pages/payment/payment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="basic/counter" element={<BasicCounter />} />
        <Route path="basic/react" element={<BasicReact />} />
        <Route path="basic/login" element={<BasicLogin />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="login" element={<SignUp />} />
        <Route path="home" element={<Home />} />
        <Route path="home/viewall" element={<ViewAll />} />
        <Route path="moviedetail" element={<Detail />} />
        <Route path="orderpage" element={<OrderPage />} />
        <Route path="paymentpage" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
