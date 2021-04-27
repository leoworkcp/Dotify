import React, { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import likedImg from "./liked-img.png";
import "./LikedSongs.css";

const LikedSongs = ({ loggedInUser, authenticated, setAuthenticated }) => {
  const { userId } = useParams();
  return (
    <div className="liked_page__container">
      <div className="liked_page__banner">
        {/*  */}
        <div className="container-ref">
          <img src={likedImg}></img>
          {/*  */}
          <div className="liked_page__info">
            <div className="liked-user__info">
              <h2>PLAYLIST</h2>
              <h1>Liked Songs</h1>
              <div className="user-info__data">
                <img src={loggedInUser.profile_URL} />
                <NavLink
                  to={`/profile/${userId}`}
                >{`${loggedInUser.username}`}</NavLink>
                <p>{` • ${1223} songs`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedSongs;
