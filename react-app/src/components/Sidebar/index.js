import React, { useState } from "react";
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

import "./SideBar.css";

const useStyles = makeStyles(() => ({
  root: {
    "& > svg": {},
  },
}));

function Sidebar({ userid }) {
  const classes = useStyles();

  const history = useHistory();

  function homeButton() {
    history.push("/");
  }
  function searchButton() {
    history.push("/search");
  }

  function libraryButton() {
    history.push(`/profile/${userid}`);
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
            onClick={libraryButton}
            fontSize="small"
          >
            <LibraryMusicIcon />
            <div>
              <p className="p-sidebar">Your Library</p>
            </div>
          </IconButton>
        </div>
        <div className="sideBar-button__playlist">
          <IconButton
            className="home-icon sideBar"
            onClick={createPlaylist}
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
            onClick={likeSongs}
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
        <div className="divider-container">
          <Divider light className="dividers" />
        </div>
      </div>
    </>
  );
}
export default Sidebar;
