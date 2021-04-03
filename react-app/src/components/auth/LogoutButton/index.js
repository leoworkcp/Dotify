import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout } from "../../../store/session";

import BlurCircularRoundedIcon from "@material-ui/icons/BlurCircularRounded";
import { withStyles } from "@material-ui/styles";
import "./LogoutButton.css";

const CustomBlurCircularRoundedIcon = withStyles({
  root: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "black",
    color: "gray",
    "&:hover": {
      borderRadius: "7px",
    },
  },
})(BlurCircularRoundedIcon);

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
      {!loggedInUser?.profile_URL ? (
        <div className="profile-icon">
          <CustomBlurCircularRoundedIcon />
        </div>
      ) : (
        <div className="profile-icon">
          <img src={loggedInUser?.profile_URL} alt="profile-pic" />
        </div>
      )}
    </>
  );
};

export default LogoutButton;
