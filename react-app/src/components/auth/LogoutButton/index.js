import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { logout } from "../../../store/session";
import "./LogoutButton.css";
import { setCurrentSong } from "../../../store/playing";
import Tooltip from "@material-ui/core/Tooltip";
const LogoutButton = ({
  setAuthenticated,
  loggedInUser,

  setIsPlaying,
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
        <NavLink to={`/profile/${loggedInUser.id}`}>
          <Tooltip title={loggedInUser.username} arrow>
            <img src={loggedInUser?.profile_URL} alt="profile-pic" />
          </Tooltip>
        </NavLink>
      </div>
    </>
  );
};

export default LogoutButton;
