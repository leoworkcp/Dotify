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
        <div className="container-ref">
          <img src={likedImg}></img>

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
      <div className="play-liked__container">
        <div className="liked-btn__container"></div>
      </div>
      <div className="song-liked__container">
        <div className="liked-grid__container">
          <div role="presentation" className="presentation-container">
            <div className="presentation__row"># </div>
            <div className="presentation__row">TITLE</div>
            <div className="presentation__row margin-move">ALBUM</div>
            <div className="presentation__row">DATE ADDED</div>
            <div className="presentation__row">⌚</div>
          </div>
          <div role="presentation" className="presentation-container">
            <div className="presentation__row">1</div>
            <div className="presentation__img">
              <div id="img_liked_container">
                <img id="img_liked-songs" src={loggedInUser.profile_URL}></img>
              </div>
              <div className="info-links__artist">
                <p> goosePoon</p>
                <NavLink id="artist_linked" to={`/profile/${userId}`}>
                  {loggedInUser.username}
                </NavLink>
              </div>
            </div>
            <div className="presentation__row">Track Star</div>
            <div className="presentation__row">11 days ago</div>
            <div className="presentation__row">3:28</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedSongs;
