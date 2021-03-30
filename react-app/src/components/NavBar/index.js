import React, { useState } from "react";
import Modal from "react-modal";
import LogoutButton from "../auth/LogoutButton/index";
import LoginForm from "../auth/LoginForm/index";
import SignUpForm from "../auth/SignUpForm/index";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 5,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#2c2f33",
    border: "none",
  },
};

Modal.setAppElement("#root");

const NavBar = ({ authenticated, setAuthenticated }) => {
  const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
  const [modalIsOpenSignUp, setIsOpenSignUp] = useState(false);

  function openModalLogin() {
    setIsOpenLogin(true);
  }

  function openModalSignUp() {
    setIsOpenSignUp(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModalLogin() {
    setIsOpenLogin(false);
  }

  function closeModalSignUp() {
    setIsOpenSignUp(false);
  }

  return (
    <nav className="mainNavBar">
      <div className="navbarContainer">
        <div className="developers__link--container">
          <div>
            <NavLink className="developers__link" to="/developers">
              Developer
            </NavLink>
          </div>
        </div>
        <NavLink className="mainLogoLink" to="/">
          <div className="mainLogoContainer">
            <div className="mainLogo">SD</div>
            <div className="mainLogoText">Dotify</div>
          </div>
        </NavLink>
        <div className="LoginSignupLogout">
          <div>
            {authenticated === true ? (
              ""
            ) : (
              <button className="LoginModalSubmit" onClick={openModalLogin}>
                Login
              </button>
            )}
          </div>
          <div>
            <Modal
              isOpen={modalIsOpenLogin}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModalLogin}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <LoginForm
                setIsOpenLogin={setIsOpenLogin}
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                openModalSignUp={openModalSignUp}
                closeModalLogin={closeModalLogin}
              />
            </Modal>
          </div>
          <div>
            {authenticated === true ? (
              ""
            ) : (
              <button className="SignUpModalSubmit" onClick={openModalSignUp}>
                Sign Up
              </button>
            )}
          </div>
          <div>
            <Modal
              isOpen={authenticated === true ? false : modalIsOpenSignUp}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModalSignUp}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <SignUpForm
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                closeModalSignUp={closeModalSignUp}
                openModalLogin={openModalLogin}
              />
            </Modal>
          </div>

          <div>
            {authenticated === false ? (
              ""
            ) : (
              <LogoutButton setAuthenticated={setAuthenticated} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
