import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setCurrentSong } from "../../store/playing";
import "./PlayButton.css";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

// modal
import Modal from "react-modal";
// import LogoutButton from "../auth/LogoutButton/index";
import LoginForm from "../auth/LoginForm/index";
import SignUpForm from "../auth/SignUpForm/index";
import Tooltip from "@material-ui/core/Tooltip";
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
const PlayButton = ({
  publicSong,
  playing,
  setIsPlaying,
  pauseSong,
  song,
  founded,
  loggedInUser,
  selectedSong,
  play,
  songId,
  authenticated,
  setAuthenticated,
  shuffleSongId,
  lastLikedSong,
}) => {
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();

  // modal
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

  // modal ends
  // console.log(founded);
  // console.log(selectedSong);
  // console.log(songId);
  useEffect(() => {
    if (selectedSong) dispatch(setCurrentSong(selectedSong));
  }, [selectedSong]);

  const setSong = (e) => {
    e.preventDefault();

    if (!authenticated) {
      return openModalLogin();
    }
    setIsPlaying(true);
    // setPlays(true);
    if (publicSong) dispatch(setCurrentSong(publicSong));
    if (song) dispatch(setCurrentSong(song));
    if (founded) dispatch(setCurrentSong(founded));
    if (lastLikedSong) dispatch(setCurrentSong(lastLikedSong));
  };

  const pausesSong = (e) => {
    e.preventDefault();

    if (playing) {
      setIsPlaying(false);
    }
  };
  // console.log(authenticated);
  // console.log(playing);
  return (
    <>
      <div className="PlayButton">
        {!playing && (
          <Tooltip title="Play" arrow>
            <button className="btn-play__active" onClick={(e) => setSong(e)}>
              <PlayArrowIcon
                style={{
                  fontSize: 40,
                }}
              />
            </button>
          </Tooltip>
        )}
        {playing && (
          <Tooltip title="Pause" arrow>
            <button
              className="btn-pause__active"
              onClick={(e) => pausesSong(e)}
            >
              <PauseIcon
                style={{
                  fontSize: 40,
                }}
              />
            </button>
          </Tooltip>
        )}
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
    </>
  );
};

export default PlayButton;
