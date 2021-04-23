import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout } from "../../../store/session";
import "./LogoutButton.css";
import { setCurrentSong } from "../../../store/playing";
const LogoutButton = ({
  setAuthenticated,
  loggedInUser,
  playing,
  setIsPlaying,
  pauseSong,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = () => {
    dispatch(logout());
    dispatch(setCurrentSong(false));
    setIsPlaying(false);
    setAuthenticated(false);
    history.push("/");
  };

  return (
    <>
      <button className="LogoutModalSubmit" onClick={onLogout}>
        Logout
      </button>
      <div className="profile-icon">
        <img src={loggedInUser?.profile_URL} alt="profile-pic" />
      </div>
    </>
  );
};

export default LogoutButton;
