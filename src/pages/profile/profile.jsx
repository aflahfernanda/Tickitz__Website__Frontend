import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer";
import { useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody, Alert } from "reactstrap";

function Profile() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(true);
  const [profile, setProfile] = useState(true);
  const [password, setPassword] = useState(true);
  const [imageUpdate, setImageUpdate] = useState(true);
  const id = localStorage.getItem("id");
  const [user, setUser] = useState([]);
  const [booking, setBooking] = useState([]);
  const [modal, setModal] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [modalProfile, setModalProfile] = React.useState(false);
  const [modalPassword, setModalPassword] = React.useState(false);
  const [updateProfile, setUpdateProfile] = useState({
    firstName: "",
    lastName: "",
    email: user.email,
    noTelp: ""
  });
  const [updatePassword, setUpdatePassword] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [imageForm, setImageForm] = useState({ image: null });
  const handleChangeImage = (event) => {
    const { name, files } = event.target;
    setImageForm({ [name]: files[0] });
  };
  useEffect(() => {
    getDataUser();
  }, []);
  useEffect(() => {
    getBookingByUserId();
  }, []);
  const handleChangeForm = (event) => {
    setUpdateProfile({ ...updateProfile, [event.target.name]: event.target.value });
  };
  const handleChangeFormPassword = (event) => {
    setUpdatePassword({ ...updatePassword, [event.target.name]: event.target.value });
  };

  console.log(updateProfile);
  const getDataUser = async () => {
    const result = await axios.get(`user/${id}`);
    setUser(result.data.data[0]);
  };
  const getBookingByUserId = async () => {
    const result = await axios.get(`booking/${id}`);
    setBooking(result.data.data);
  };
  const handleUpdateProfile = async () => {
    try {
      const result = await axios.patch(`user/profile/${id}`, updateProfile);
      setProfile(true);
      getDataUser();
      alert("succes update");
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleUpdatePassword = async () => {
    try {
      const result = await axios.patch(`user/password/${id}`, updatePassword);
      setPassword(true);
      getDataUser();
      alert("succes update password");
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.msg);
    }
  };
  const handleDeleteImage = async () => {
    try {
      const result = await axios.delete(`user/delete/${id}`);
      setImageUpdate(true);
      getDataUser();
      alert("Succes Delete Image");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmitImage = async (e) => {
    try {
      e.preventDefault();
      const formSend = {
        image: imageForm.image
      };
      const formData = new FormData();
      for (const data in formSend) {
        formData.append(data, formSend[data]);
      }
      const update = await axios.patch(`user/image/${id}`, formData);
      setImageUpdate(true);
      getDataUser();
      alert("Success Change Profile");
    } catch (error) {
      console.log(error);
    }
  };
  const handleOrder = () => {
    setOrder(false);
  };
  const handleProfile = () => {
    setProfile(false);
  };
  const handlepassword = () => {
    setPassword(false);
  };
  const handleImage = () => {
    setImageUpdate(false);
  };
  const handleResult = (id) => {
    // [1] = localstorage
    // [2] = lempar data dengan state
    navigate("/ticket", { state: [id] });
  };
  const handleResponse = async (event) => {
    setModal(!modal);
  };
  const handleResponseDelete = async (event) => {
    setModalDelete(!modalDelete);
  };
  const handleResponseProfile = async (event) => {
    setModalProfile(!modalProfile);
  };
  const handleResponsePassword = async (event) => {
    setModalPassword(!modalPassword);
  };
  const handleResponseModal = async (event) => {
    setModal(false);
  };
  const handleResponseModalDelete = async (event) => {
    setModalDelete(false);
  };
  const handleResponseModalProfile = async (event) => {
    setModalProfile(false);
  };
  const handleResponseModalPassword = async (event) => {
    setModalPassword(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    alert("Succes Log Out");
    navigate("/login");
  };
  return (
    <>
      <Navbar />
      <div className="profile__bgcolor">
        <div className=" container profile__flex">
          <div className="profile__flex1">
            <div className="profile__infoProfile">
              <p className="profile__infoHeader">Info</p>
              <div className="profile__image">
                {user.image == null ? (
                  <img
                    src={
                      "https://res.cloudinary.com/da776aoko/image/upload/v1651001489/Tickitz/user/pablzpvknbdiz3zdbgv4.png"
                    }
                    alt=""
                    className="profile__imageBox"
                  />
                ) : (
                  <img
                    src={`https://res.cloudinary.com/da776aoko/image/upload/v1651001489/${user.image}`}
                    alt=""
                    className="profile__imageBox"
                  />
                )}
              </div>
              {imageUpdate ? (
                <div className="profile__buttonBox">
                  <button className="profile__updateImageButton" onClick={handleImage}>
                    Update Image
                  </button>
                </div>
              ) : (
                <div>
                  <div className="profile__buttonBox">
                    <input
                      type="file"
                      id="userFiles"
                      name="image"
                      onChange={handleChangeImage}
                      className="profile__updateImageButton"
                      placeholder="Update Image"
                    />
                    <button onClick={handleResponse} className="profile__updateButton">
                      Update
                    </button>
                    <Modal
                      isOpen={modal}
                      toggle={handleResponse}
                      modalTransition={{ timeout: 1000 }}>
                      <ModalHeader>
                        <div className="modal__headerBox">
                          <p className="modal__header">Update Image Confirmation</p>
                        </div>
                      </ModalHeader>
                      <ModalBody>
                        <p className="update__confirm">Are You Sure Want To Update?</p>
                        <div className="update__confirmFlex">
                          <button onClick={handleResponseModal} className="update__confirm__cancel">
                            Cancel
                          </button>
                          <button onClick={handleSubmitImage} className="update__confirm__update">
                            update
                          </button>
                        </div>
                      </ModalBody>
                    </Modal>
                  </div>
                  <div className="profile__buttonBox">
                    <button className="profile__deleteImageButton" onClick={handleResponseDelete}>
                      Delete Images
                    </button>
                    <Modal
                      isOpen={modalDelete}
                      toggle={handleResponseDelete}
                      modalTransition={{ timeout: 1000 }}>
                      <ModalHeader>
                        <div className="modal__headerBox">
                          <p className="modal__header">Delete Image Confirmation</p>
                        </div>
                      </ModalHeader>
                      <ModalBody>
                        <p className="update__confirm">Are You Sure Want To Delete Image?</p>
                        <div className="update__confirmFlex">
                          <button
                            onClick={handleResponseModalDelete}
                            className="update__confirm__cancel">
                            Cancel
                          </button>
                          <button onClick={handleDeleteImage} className="update__confirm__update">
                            Delete
                          </button>
                        </div>
                      </ModalBody>
                    </Modal>
                  </div>
                  <div className="profile__buttonBox">
                    <button
                      className="profile__cancelImageButton"
                      onClick={() => setImageUpdate(true)}>
                      Cancel Update
                    </button>
                  </div>
                </div>
              )}

              <p className="profile__name"> {user.firstName + " " + user.lastName}</p>
              <p className="profile__email">{user.email}</p>
              <hr />
              <div className="profile__buttonBox">
                <button className="profile__buttonLogout" onClick={handleLogout}>
                  {" "}
                  Logout{" "}
                </button>
              </div>
            </div>
          </div>

          <div className="profile__flex2">
            {order ? (
              <div className="profile__profileChoice">
                <p
                  className="profile__accountSettings"
                  onClick={() => setOrder(true)}
                  style={{ color: "#5f2eea", fontWeight: "bold" }}>
                  Account Settings
                </p>
                <p className="profile__orderHistory" onClick={handleOrder}>
                  Order History
                </p>
              </div>
            ) : (
              <div className="profile__profileChoice">
                <p className="profile__accountSettings" onClick={() => setOrder(true)}>
                  Account Settings
                </p>
                <p
                  className="profile__orderHistory"
                  onClick={handleOrder}
                  style={{ color: "#5f2eea", fontWeight: "bold" }}>
                  Order History
                </p>
              </div>
            )}

            {order ? (
              <>
                {profile ? (
                  <div>
                    <div className="profile__detailsInformation">
                      <p className="profile__detailsHeader">Details Information</p>
                      <hr />
                      <div className="profile__detailInput">
                        <div className="profile__detailInputFlex1">
                          <p className="profile__inputHeader">First Name</p>
                          <p className="profile__inputHeader">{user.firstName}</p>
                        </div>
                        <div className="profile__detailInputFlex2">
                          <p className="profile__inputHeader">Last Name</p>
                          <p className="profile__inputHeader">{user.lastName}</p>
                        </div>
                      </div>
                      <div className="profile__detailInput">
                        <div className="profile__detailInputFlex1">
                          <p className="profile__inputHeader">Email</p>
                          <p className="profile__inputHeader">{user.email}</p>
                        </div>
                        <div className="profile__detailInputFlex2">
                          <p className="profile__inputHeader">Phone Number</p>
                          <p className="profile__inputHeader">{user.noTelp}</p>
                        </div>
                      </div>
                    </div>
                    <div className="button__updateFlex">
                      <button className="button__updateChanges" onClick={handleProfile}>
                        Update Profile
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="profile__detailsInformation">
                      <p className="profile__detailsHeader">Details Information</p>
                      <hr />
                      <div className="profile__detailInput">
                        <div className="profile__detailInputFlex1">
                          <p className="profile__inputHeader">First Name</p>
                          <input
                            type="text"
                            name="firstName"
                            id=""
                            className="profile__input"
                            placeholder="Type Your FirstName"
                            onChange={handleChangeForm}
                          />
                        </div>
                        <div className="profile__detailInputFlex2">
                          <p className="profile__inputHeader">Last Name</p>
                          <input
                            type="text"
                            name="lastName"
                            id=""
                            placeholder="Type Your LastName"
                            className="profile__input"
                            onChange={handleChangeForm}
                          />
                        </div>
                      </div>
                      <div className="profile__detailInput">
                        <div className="profile__detailInputFlex1">
                          <p className="profile__inputHeader">Email</p>
                          <input
                            type="text"
                            name="email"
                            id=""
                            className="profile__input"
                            placeholder="Type Your FirstName"
                            value={user.email}
                            onChange={handleChangeForm}
                          />
                        </div>
                        <div className="profile__detailInputFlex2">
                          <p className="profile__inputHeader">Phone Number</p>
                          <input
                            type="text"
                            name="noTelp"
                            id=""
                            placeholder="Type Your LastName"
                            className="profile__input"
                            onChange={handleChangeForm}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="button__updateFlex">
                      <button className="button__cancelUpdate" onClick={() => setProfile(true)}>
                        Cancel Update
                      </button>
                      <button className="button__updateChanges" onClick={handleResponseProfile}>
                        Update Changes
                      </button>
                      <Modal
                        isOpen={modalProfile}
                        toggle={handleResponseProfile}
                        modalTransition={{ timeout: 1000 }}>
                        <ModalHeader>
                          <div className="modal__headerBox">
                            <p className="modal__header">Update Profile Confirmation</p>
                          </div>
                        </ModalHeader>
                        <ModalBody>
                          <p className="update__confirm">Are You Sure Want To Update Profile?</p>
                          <div className="update__confirmFlex">
                            <button
                              onClick={handleResponseModalProfile}
                              className="update__confirm__cancel">
                              Cancel
                            </button>
                            <button
                              onClick={handleUpdateProfile}
                              className="update__confirm__update">
                              Update
                            </button>
                          </div>
                        </ModalBody>
                      </Modal>
                    </div>
                  </div>
                )}

                {password ? (
                  <>
                    <div className="profile__detailsInformation">
                      <p className="profile__detailsHeader">Account and Privacy</p>
                      <hr />
                      <p className="profile__inputHeader">
                        Click buttton below to change your password, make sure you remember your
                        password after change
                      </p>
                    </div>
                    <div className="button__updateFlex">
                      <button className="button__updateChanges" onClick={handlepassword}>
                        Update Password
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="profile__detailsInformation">
                      <p className="profile__detailsHeader">Account and Privacy</p>
                      <hr />
                      <div className="profile__detailInput">
                        <div className="profile__detailInputFlex1">
                          <p className="profile__inputHeader">New Password</p>
                          <input
                            type="password"
                            name="newPassword"
                            id=""
                            className="profile__input"
                            placeholder="Type Your New Password"
                            onChange={handleChangeFormPassword}
                          />
                        </div>
                        <div className="profile__detailInputFlex2">
                          <p className="profile__inputHeader">Confirm Password</p>
                          <input
                            type="password"
                            name="confirmPassword"
                            id=""
                            placeholder="Type Your Confirm Password"
                            className="profile__input"
                            onChange={handleChangeFormPassword}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="button__updateFlex">
                      <button className="button__cancelUpdate" onClick={() => setPassword(true)}>
                        Cancel Update
                      </button>
                      <button className="button__updateChanges" onClick={handleResponsePassword}>
                        Update Changes
                      </button>
                      <Modal
                        isOpen={modalPassword}
                        toggle={handleResponsePassword}
                        modalTransition={{ timeout: 1000 }}>
                        <ModalHeader>
                          <div className="modal__headerBox">
                            <p className="modal__header">Update Password Confirmation</p>
                          </div>
                        </ModalHeader>
                        <ModalBody>
                          <p className="update__confirm">Are You Sure Want To Update Password?</p>
                          <div className="update__confirmFlex">
                            <button
                              onClick={handleResponseModalPassword}
                              className="update__confirm__cancel">
                              Cancel
                            </button>
                            <button
                              onClick={handleUpdatePassword}
                              className="update__confirm__update">
                              Update
                            </button>
                          </div>
                        </ModalBody>
                      </Modal>
                    </div>{" "}
                  </>
                )}
              </>
            ) : (
              <div>
                <div className="profile__orderCardBox">
                  {booking.map((item) => (
                    <div className="profile__orderCard" key={item.id}>
                      <div className="profile__orderCardFlex">
                        <div>
                          <p className="profile__orderDate">
                            {item.dateBooking.split("T")[0]} - {item.timeBooking.split(".")[0]}
                          </p>
                          <p className="profile__orderMovie">{item.name}</p>
                        </div>
                        <div>
                          {item.premiere === "hiflix" ? (
                            <img
                              src={require("../../assets/assets/VectorCinema3.png")}
                              alt="ubv.id"
                            />
                          ) : item.premiere === "ebu.id" ? (
                            <img
                              src={require("../../assets/assets/VectorCinema1.png")}
                              alt="ubv.id"
                            />
                          ) : item.premiere === "CineOne21" ? (
                            <img
                              src={require("../../assets/assets/VectorCinema2.png")}
                              alt="ubv.id"
                            />
                          ) : null}
                        </div>
                      </div>
                      <hr />
                      <button
                        className="profile__orderTicketButton"
                        onClick={() => handleResult(item.id)}>
                        Ticket In Active
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
