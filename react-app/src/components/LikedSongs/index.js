import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import likedImg from "./liked-img.png";
import * as likeActions from "../../store/likes";
import "./LikedSongs.css";

const LikedSongs = ({
  loggedInUser,
  authenticated,
  setAuthenticated,
  publicSongs,
  userid,
}) => {
  const dispatch = useDispatch();
  const [hadLiked, setHadLiked] = useState(false);

  // console.log(publicSongs);
  //   console.log(userid);
  const likes = useSelector((state) =>
    state?.likes
      .map((like) =>
        Object.values(publicSongs).find(
          (song) =>
            song?.id == parseInt(like) && song?.artist_id !== parseInt(userid)
        )
      )
      .filter((s) => s !== undefined)
  );

  const hasLikes = useSelector((state) => state?.likes);
  // console.log(likes);

  // console.log(hasLikes);

  useEffect(() => {
    if (userid) dispatch(likeActions.fetchUserLikes(userid));
  }, [dispatch]);
  useEffect(() => {
    if (hasLikes) setHadLiked(true);
  }, []);
  // console.log(hadLiked);
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
                  to={`/profile/${userid}`}
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
          <div role="presentation" id="presentation-container">
            <div className="presentation__row"># </div>
            <div className="presentation__row">TITLE</div>
            <div className="presentation__row margin-move">ALBUM</div>
            <div className="presentation__row">DATE ADDED</div>
            <div className="presentation__row">⌚</div>
          </div>

          {hadLiked &&
            likes.map((lik, idx) => {
              idx++;
              return (
                <div
                  role="presentation"
                  className="presentation-container"
                  key={idx}
                >
                  <div className="presentation__row">{idx}</div>
                  <div className="presentation__img">
                    <div id="img_liked_container">
                      <img id="img_liked-songs" src={lik.image_url}></img>
                    </div>
                    <div className="info-links__artist">
                      <p> {lik.name}</p>
                      <NavLink id="artist_linked" to={`/profile/${userid}`}>
                        {lik.artist?.username}
                      </NavLink>
                    </div>
                  </div>
                  <div className="presentation__row">{lik.album}</div>
                  <div className="presentation__row">11 days ago</div>
                  <div className="presentation__row">3:28</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default LikedSongs;
