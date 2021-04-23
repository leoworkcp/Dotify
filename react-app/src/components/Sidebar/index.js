import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// ---------------------------------
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
// ---------------------------------
// import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowLeftSharpIcon from "@material-ui/icons/ArrowLeftSharp";
// ---------------------------------

import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
// modal
import Modal from "react-modal";
import LogoutButton from "../auth/LogoutButton/index";
import LoginForm from "../auth/LoginForm/index";
import SignUpForm from "../auth/SignUpForm/index";
import "./SideBar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > svg": {},
    typography: {
      padding: theme.spacing(2),
    },
  },
}));
// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: 500,
//     "& > svg": {},
//   },
//   typography: {
//     padding: theme.spacing(2),
//   },
// }));
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
function Sidebar({ userid, authenticated, setAuthenticated }) {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [arrowEl, setArrowEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const classes = useStyles();
  // modal
  const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
  const [modalIsOpenSignUp, setIsOpenSignUp] = useState(false);
  // const [modalIsOpenSongForm, setIsOpenSongForm] = useState(false);

  function openModalLogin() {
    setIsOpenLogin(true);
  }

  function openModalSignUp() {
    setIsOpenSignUp(true);
  }

  // function openModalSongForm() {
  //   setIsOpenSongForm(true);
  // }
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
  // function closeModalSongForm() {
  //   setIsOpenSongForm(false);
  // }
  // modal ends

  const handleClick = (newPlacement) => (event) => {
    if (authenticated) {
      history.push(`/profile/${userid}`);
    } else {
      setAnchorEl(event.currentTarget);

      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (modalIsOpenLogin || modalIsOpenSignUp) {
      return setAnchorEl(null);
    }
  }, [modalIsOpenLogin, modalIsOpenSignUp]);
  // const handleArrowRef = (arrow) => {
  //   setArrowEl(arrow);
  // };

  // const classes = useStyles();
  console.log(userid);
  console.log(authenticated);
  const history = useHistory();

  function homeButton() {
    history.push("/");
  }
  function searchButton() {
    history.push("/search");
  }

  // function libraryButton() {
  //   if (authenticated) {
  //     history.push(`/profile/${userid}`);
  //   }
  //   //to build dropdown
  //   //to signup/login modal
  //   else {
  //     return setTimeout(() => alert("Please Login"), 100);
  //   }
  // }

  function createPlaylist() {
    return setTimeout(
      () => alert("Sorry, this Page is under construction."),
      100
    );

    // if (authenticated) {
    //   history.push("/create/playlist");
    // } else {
    //   return setTimeout(
    //     () => alert("Sorry, this Page is under construction."),
    //     100
    //   );
    // }
  }

  function likeSongs() {
    return setTimeout(
      () => alert("Sorry, this Page is under construction."),
      100
    );

    // if (authenticated) {
    //   history.push("/collection/tracks");
    // } else {
    //   return setTimeout(
    //     () => alert("Sorry, this Page is under construction."),
    //     100
    //   );
    // }
  }

  function enterButton() {
    history.push("/entertainment");
  }

  return (
    <>
      <div className="sidebar-main-container">
        <div className="sideBar-title-container">
          <img
            alt="logo"
            id="spoty-log"
            src="https://open.scdn.co/cdn/images/favicon.5cb2bd30.ico"
          />
          <h1 className="sideBar-title"> Dotify </h1>
        </div>
        <div className="sideBar-button__home">
          <IconButton
            className="home-icon sideBar"
            onClick={homeButton}
            fontSize="small"
          >
            <HomeIcon />
            <div>
              <p className="p-sidebar">Home</p>
            </div>
          </IconButton>
        </div>
        <div className="sideBar-button__search">
          <IconButton
            className="home-icon sideBar"
            onClick={searchButton}
            fontSize="small"
          >
            <SearchIcon />
            <div>
              <p className="p-sidebar">Search</p>
            </div>
          </IconButton>
        </div>
        <div className="sideBar-button__library">
          <IconButton
            className="home-icon sideBar"
            onClick={handleClick("left")}
            fontSize="small"
          >
            <LibraryMusicIcon />
            <div>
              <p className="p-sidebar">Your Library</p>
            </div>

            <Popper
              className={classes.popper}
              open={open}
              anchorEl={anchorEl}
              placement={placement}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={50}>
                  <Paper>
                    <ArrowLeftSharpIcon> </ArrowLeftSharpIcon>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <Typography className={classes.typography}>
                        Enjoy Your Library
                      </Typography>
                      <Typography className={classes.typography}>
                        Log in to see saved songs, artists and playlists in Your
                        Library.
                      </Typography>
                      {/* <MenuItem onClick={handleClose}>Demo user</MenuItem> */}
                      <div id="menuItem">
                        <MenuItem onClick={handleClose}>NOT NOW</MenuItem>

                        <MenuItem onClick={openModalSignUp}>SIGN UP</MenuItem>
                        <MenuItem onClick={openModalLogin}>LOG IN</MenuItem>
                      </div>
                    </Menu>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </IconButton>
        </div>
        <div className="sideBar-button__playlist">
          <IconButton
            className="home-icon sideBar"
            onClick={handleClick("left")}
            fontSize="small"
          >
            <AddBoxIcon className="playlist-icon" />
            <div>
              <p className="p-sidebar">Create Playlist</p>
            </div>
          </IconButton>
        </div>
        <div className="sideBar-button__liked">
          <IconButton
            className="home-icon sideBar"
            onClick={handleClick("left")}
            fontSize="small"
          >
            <div className={classes.root}>
              <div className="background-color">
                <FavoriteIcon className="fav-icon" fontSize="small" />
              </div>
            </div>
            <div>
              <p className="p-sidebar">Liked Songs</p>
            </div>
          </IconButton>
        </div>
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
        <div className="divider-container">
          <Divider light className="dividers" />
        </div>
      </div>
    </>
  );
}
export default Sidebar;
