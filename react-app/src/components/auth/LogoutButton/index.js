import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { logout } from "../../../store/session";
// new stuff
import EditUserForm from "../SignUpForm/editUserForm.js";
import {
  MenuList,
  MenuItem,
  Popper,
  Paper,
  IconButton,
  ClickAwayListener,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Modal from "react-modal";
// new stuff ends

import "./LogoutButton.css";
import { setCurrentSong } from "../../../store/playing";
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

const CustomMenuList = withStyles({
  root: {
    // width: "150px",
    // height: "50px",
    // boxShadow: "3px 3px 3px #28292E",
    // backgroundColor: "#18191C",

    // backgroundColor: "red",
    borderRadius: "5px",
    position: "relative",
    zIndex: 6,
  },
})(MenuList);

const CustomMenuItem = withStyles({
  root: {
    "&:hover": {
      backgroundColor: "#383838",
      borderRadius: "5px",
    },
    padding: "5px 10px",
    margin: "0px 6px",
    display: "flex",
    justifyContent: "space-around",
    position: "relative",
    zIndex: 2,
  },
})(MenuItem);

const CustomIconButton = withStyles({
  root: {
    padding: "6px",
    position: "relative",
    zIndex: 0,
    boxSizing: "border-box",
  },
})(IconButton);

const LogoutButton = ({
  setAuthenticated,
  loggedInUser,
  authenticated,
  setIsPlaying,
}) => {
  const dispatch = useDispatch();

  const history = useHistory();
  // new stuff
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [modalIsOpenEditUserForm, setIsOpenEditUserForm] = useState(false);

  function openEditUserForm() {
    setIsOpenEditUserForm(true);
    setOpen(false);
  }
  function closeEditUserForm() {
    setIsOpenEditUserForm(false);
    setOpen(true);
  }
  function openModal() {
    setOpen(true);
    // console.log("llll");
  }
  // console.log(open);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setIsOpenEditUserForm(false);
  };

  // new stuff ends

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
    <div className="user-preferences">
      <CustomIconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={(e) => openModal(e)}
        ref={anchorRef}
      >
        <Tooltip title="Log Out, Edit Profile" arrow={true}>
          <MoreVertIcon />
        </Tooltip>
      </CustomIconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{
          position: "relative",
          zIndex: 22,
        }}
      >
        <Paper
          style={{
            // backgroundColor: "#18191c75",
            marginBottom: "3px",
            position: "relative",
            zIndex: 12,
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <CustomMenuList style={{ color: "white" }}>
              <div className="div-btn__containerEditUser">
                <CustomMenuItem>
                  <button
                    onClick={(e) => openEditUserForm(e)}
                    // key={`edit${}`}
                  >
                    Edit
                    <EditIcon style={{ color: "white" }} />
                  </button>
                </CustomMenuItem>
              </div>

              <div className="div-btn__containerEditUser">
                <CustomMenuItem>
                  <button
                    className="LogoutModalSubmit"
                    onClick={(e) => onLogout(e)}
                  >
                    Log Out
                    <ExitToAppIcon style={{ color: "white" }} />
                  </button>
                </CustomMenuItem>
              </div>
            </CustomMenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
      {/* end new stuff */}
      <div className="profile-icon">
        <NavLink to={`/profile/${loggedInUser.id}`}>
          <Tooltip title={loggedInUser.username} arrow>
            <img src={loggedInUser?.profile_URL} alt="profile-pic" />
          </Tooltip>
        </NavLink>
      </div>
      <div className="LoginSongForm">
        <Modal
          isOpen={modalIsOpenEditUserForm}
          onRequestClose={closeEditUserForm}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <EditUserForm
            // songsId={songsId}
            // song={song}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            closeEditUserForm={closeEditUserForm}
          />
        </Modal>
      </div>
    </div>
  );
};

export default LogoutButton;
