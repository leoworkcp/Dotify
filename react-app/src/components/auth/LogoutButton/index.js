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
  authenticated,
  setIsPlaying,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = (e) => {
    e.preventDefault();
    setIsPlaying(false);
    setAuthenticated(false);
    dispatch(logout());
    dispatch(setCurrentSong(false));

    history.push("/");
  };

  // console.log(authenticated);
  return (
    <>
      <button className="LogoutModalSubmit" onClick={(e) => onLogout(e)}>
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
