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
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const classes = useStyles();
  // modal
  const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
  const [modalIsOpenSignUp, setIsOpenSignUp] = useState(false);

  const [lib, setLib] = useState(false);
  const [pla, setPla] = useState(false);
  const [lik, setLik] = useState(false);
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

  const handleClickLibrary = (newPlacement) => (event) => {
    if (authenticated) {
      history.push(`/profile/${userid}`);
    } else {
      setLib(true);
      setLik(false);
      setPla(false);
      setAnchorEl(event.currentTarget);

      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    }
  };
  const handleClickPlaylist = (newPlacement) => (event) => {
    // setAnchorEl(null);
    if (authenticated) {
      // history.push("/create/playlist");
      return setTimeout(
        () => alert("Sorry, this Page is under construction."),
        100
      );
    } else {
      setPla(true);
      setLik(false);
      setLib(false);

      setAnchorEl(event.currentTarget);

      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    }
  };
  const handleClickLiked = (newPlacement) => (event) => {
    if (authenticated) {
      // history.push("/collection/tracks");
      return setTimeout(
        () => alert("Sorry, this Page is under construction."),
        100
      );
    } else {
      setLik(true);
      setLib(false);
      setPla(false);
      setAnchorEl(event.currentTarget);

      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    }
  };
  const handleClose = () => {
    setLib(false);
    setPla(false);
    setLik(false);

    return setTimeout(() => setAnchorEl(null), 10);

    // setPlacement();
  };

  console.log(userid);
  console.log(authenticated);

  function homeButton() {
    history.push("/");
  }
  function searchButton() {
    history.push("/search");
  }

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
  useEffect(() => {
    // if (modalIsOpenLogin || modalIsOpenSignUp) {
    //   return setAnchorEl(null);
    // }
    if (
      modalIsOpenLogin ||
      modalIsOpenSignUp ||
      (anchorEl !== null && !modalIsOpenSignUp) ||
      (anchorEl !== null && !modalIsOpenLogin)
    ) {
      return setAnchorEl(null);
    }
  }, [modalIsOpenLogin, modalIsOpenSignUp]);
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
            onClick={handleClickLibrary("left")}
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
                <Fade {...TransitionProps} timeout={250}>
                  <Paper>
                    <ArrowLeftSharpIcon> </ArrowLeftSharpIcon>

                    {console.log(anchorEl)}
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <Typography className={classes.typography}>
                        {lib && `Enjoy Your Library`}
                        {pla && `Create a playlist`}
                        {lik && `Enjoy your Liked Songs`}
                      </Typography>
                      <Typography className={classes.typography}>
                        {lib &&
                          `Log in to see saved songs, artists and playlists in Your
                        Library.`}
                        {pla && `Log in to create and share playlists.`}
                        {lik &&
                          `Log in to see all the songs you’ve liked in one easy playlist.`}
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
            onClick={handleClickPlaylist("left")}
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
            onClick={handleClickLiked("left")}
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
