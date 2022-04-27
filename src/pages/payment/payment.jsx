import React from "react";
import "./payment.css";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer";

function Payment() {
  return (
    <>
      <Navbar />
      {/* { <!----------------------------------Payment Info---------------------------------------------->} */}
      <section className="movieSelecteds">
        <section className="container movieSelected__flexs">
          <div className="movieSelected__flexs1">
            <h3 className="movieSelected__headers">Payment Info</h3>
            <div className="container main__seat--movieInfos">
              <section className="personal__box--flexs">
                <div className="flex__movies">
                  <p className="flex__movie--infos">Date & Time</p>
                </div>
                <div className="flex__results">
                  <p className="flex__movie--results">Tuesday, 07 July 2020 at 02:00</p>
                </div>
              </section>
              <hr />
              <section className="personal__box--flexs">
                <div className="flex__movies">
                  <p className="flex__movie--infos">Movie Selected</p>
                </div>
                <div className="flex__results">
                  <p className="flex__movie--results">Spiderman:HomeComing</p>
                </div>
              </section>
              <hr />
              <section className="personal__box--flexs">
                <div className="flex__movies">
                  <p className="flex__movie--infos">Cinema Name</p>
                </div>
                <div className="flex__results">
                  <p className="flex__movie--results">CineOne21</p>
                </div>
              </section>
              <hr />
              <section className="personal__box--flexs">
                <div className="flex__movies">
                  <p className="flex__movie--infos">Number Of Ticket</p>
                </div>
                <div className="flex__results">
                  <p className="flex__movie--results">3 Pieces</p>
                </div>
              </section>
              <hr />
              <section className="personal__box--flexs">
                <div className="flex__movies">
                  <p className="flex__movie--infos1">Total Payment</p>
                </div>
                <div className="flex__results">
                  <p className="flex__movie--results1">$30,00</p>
                </div>
              </section>
            </div>
            {/* {<!----------------------------------Choose Payment Method ---------------------------------------------->} */}
            <h1 className="container movieInfo__headers">Choose a Payment Method</h1>
            <section className="seat__borders">
              <section className="seat__border--boxs">
                <button className="border__box--grids">
                  <img
                    src="./paymentPage/assets/logos_google-pay.png"
                    alt="payment/image"
                    width="100%"
                    height="100%"
                  />
                </button>
                <button className="border__box--grids">
                  <img src="./paymentPage/assets/Visa.png" alt="payment/image" width="100%" />
                </button>
                <button className="border__box--grids">
                  <img
                    src="./paymentPage/assets/Logo GoPay (SVG-240p) - FileVector69 1.png"
                    alt="payment/image"
                    width="100%"
                  />
                </button>
                <button className="border__box--grids">
                  <img
                    src="./paymentPage/assets/logos_paypal.png"
                    alt="payment/image"
                    width="50%"
                  />
                </button>
                <button className="border__box--grids">
                  <img
                    src="./paymentPage/assets/Logo DANA (PNG-240p) - FileVector69 1.png"
                    alt="payment/image"
                    width="100%"
                  />
                </button>
                <button className="border__box--grids">
                  <img
                    src="./paymentPage/assets/Bank BCA Logo (SVG-240p) - FileVector69 1.png"
                    alt="payment/image"
                    width="100%"
                  />
                </button>
                <button className="border__box--grids">
                  <img
                    src="./paymentPage/assets/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.png"
                    alt="payment/image"
                    width="70%"
                  />
                </button>

                <button className="border__box--grids">
                  <img src="./paymentPage/assets/ovo.png" alt="payment/image" width="100%" />
                </button>
              </section>
              <p className="ors">or</p>
              <p className="links">
                Pay via cash.{" "}
                <a href="" className="link__workss">
                  See how it works
                </a>
              </p>
            </section>
            <div className="buttons">
              <section className="button__changes">
                <a href="orderPage.html">
                  <button className="button__change--movies">Previous Step</button>
                </a>
              </section>
              <section className="button__checkouts">
                <button className="button__checkout--movies">Pay Your Order</button>
              </section>
            </div>
          </div>

          {/* {<!----------------------------------Personal Info---------------------------------------------->} */}

          <div className="movieSelected__flexs2">
            <h1 className="container movieInfo__headers">Personal Info</h1>
            <section className="personal__boxs">
              <h5 className="personal__box--headers">Full Name</h5>
              <input
                type="text"
                placeholder="Write Your Full Name"
                className="personal__box--name"
              />
              <h5 className="personal__box--headers">Email</h5>
              <input
                type="email"
                placeholder="Write Your Email"
                className="personal__box--emails"
              />
              <h5 className="personal__box--headers">Phone Number</h5>
              <input
                type="tel"
                placeholder="Write Your phone number"
                className="personal__box--phones"
                data-format="+62"
              />
              <div className="alerts">
                <h5 className="alert__texts">Fill Your Data Corectly</h5>
              </div>
            </section>
            <a href="paymentPage.html">
              <button className="orderPage__buttons">CheckOut Now</button>
            </a>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}

export default Payment;
