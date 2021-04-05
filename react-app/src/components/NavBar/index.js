import React, { useState } from "react";
import Modal from "react-modal";
import LogoutButton from "../auth/LogoutButton/index";
import LoginForm from "../auth/LoginForm/index";
import SignUpForm from "../auth/SignUpForm/index";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import SongForm from "../SongForm/index";
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
    backgroundColor: "#181818",
    border: "none",
  },
};

Modal.setAppElement("#root");

const NavBar = ({ authenticated, setAuthenticated, loggedInUser }) => {
  const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
  const [modalIsOpenSignUp, setIsOpenSignUp] = useState(false);
  const [modalIsOpenSongForm, setIsOpenSongForm] = useState(false);

  function openModalLogin() {
    setIsOpenLogin(true);
  }

  function openModalSignUp() {
    setIsOpenSignUp(true);
  }

  function openModalSongForm() {
    setIsOpenSongForm(true);
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
  function closeModalSongForm() {
    setIsOpenSongForm(false);
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
            <div className="mainLogo">DS</div>
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
              <LogoutButton
                setAuthenticated={setAuthenticated}
                loggedInUser={loggedInUser}
              />
            )}
          </div>
        </div>
        {/* new stuff */}
        <div className="LoginSongForm">
          <div>
            {authenticated === false ? (
              ""
            ) : (
              <button
                className="SongFormModalSubmit"
                onClick={openModalSongForm}
              >
                Upload
              </button>
            )}
          </div>

          <Modal
            isOpen={modalIsOpenSongForm}
            onRequestClose={closeModalSongForm}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <SongForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              closeModalSongForm={closeModalSongForm}
            />
          </Modal>
        </div>
        {/* new stuff */}
      </div>
    </nav>
  );
};

export default NavBar;
