import React, { useState, useEffect } from "react";
import { useHistory, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";

import { fetchUserSongs } from "../../store/userInfo";
import Modal from "react-modal";
import "./SideBar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > svg": {},
  },
}));

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
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
    backgroundColor: "#2c2f33",
    borderColor: "#2f3135",
  },
};

Modal.setAppElement("#root");

function Sidebar({ authenticated, setAuthenticated }) {
  const classes = useStyles();

  const history = useHistory();

  const [showSongModal, setShowSongModal] = useState(false);
  const [songId, setSongId] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
  const [modalIsOpenSignUp, setIsOpenSignUp] = useState(false);
  const location = useLocation();

  const loggedInUser = useSelector((state) => state?.session.user);

  function openModalLogin() {
    setIsOpenLogin(true);
  }

  function openModalSignUp() {
    setIsOpenSignUp(true);
  }

  function closeModalLogin() {
    setIsOpenLogin(false);
  }

  function closeModalSignUp() {
    setIsOpenSignUp(false);
  }

  //   useEffect(() => {
  //     dispatch(fetchUserSongs(loggedInUser?.id));
  //     setIsLoaded(true);
  //   }, [dispatch]);

  function homeButton() {
    history.push("/");
  }
  function searchButton() {
    history.push("/search");
  }

  function libraryButton() {
    history.push("/collection/playlist");
  }

  function createPlaylist() {
    history.push("/create/playlist");
  }

  function likeSongs() {
    history.push("/collection/tracks");
  }

  function enterButton() {
    history.push("/entertainment");
  }

  return (
    <>
      <div className="sidebar-main-container">
        <div className="sideBar-title-container">
          <img
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
            <td>Home</td>
          </IconButton>
        </div>
        <div className="sideBar-button__search">
          <IconButton
            className="home-icon sideBar"
            onClick={searchButton}
            fontSize="small"
          >
            <SearchIcon />
            <td>Search</td>
          </IconButton>
        </div>
        <div className="sideBar-button__library">
          <IconButton
            className="home-icon sideBar"
            onClick={libraryButton}
            fontSize="small"
          >
            <LibraryMusicIcon />

            <td>Your Library</td>
          </IconButton>
        </div>
        <div className="sideBar-button__playlist">
          <IconButton
            className="home-icon sideBar"
            onClick={createPlaylist}
            fontSize="small"
          >
            <AddBoxIcon className="playlist-icon" />
            <td>Create Playlist</td>
          </IconButton>
        </div>
        <div className="sideBar-button__liked">
          <IconButton
            className="home-icon sideBar"
            onClick={likeSongs}
            fontSize="small"
          >
            <div className={classes.root}>
              <div className="background-color">
                <FavoriteIcon className="fav-icon" fontSize="small" />
              </div>
            </div>
            <td>Liked Songs</td>
          </IconButton>
        </div>
        <div className="divider-container">
          <Divider light className="dividers" />
        </div>
      </div>
    </>
  );
}
export default Sidebar;
