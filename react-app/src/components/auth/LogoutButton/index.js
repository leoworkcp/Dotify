import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout } from "../../../store/session";
import "./LogoutButton.css";

const LogoutButton = ({ setAuthenticated, loggedInUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    await dispatch(logout());
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
