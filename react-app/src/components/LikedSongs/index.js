import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import likedImg from "./liked-img.png";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import * as likeActions from "../../store/likes";
import PlayButton from "../PlayButton/index";
import "./LikedSongs.css";
import eqGif from "./equalizerGIF.gif";
const LikedSongs = ({
  loggedInUser,
  authenticated,
  setAuthenticated,
  publicSongs,
  userid,
  playing,
  setIsPlaying,
  pauseSong,
}) => {
  const dispatch = useDispatch();
  const [hadLiked, setHadLiked] = useState(false);

  const [deleteShown, setDeleteShown] = useState(false);
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
  console.log(hasLikes);
  // console.log(likes[0]);

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
                <p>{` • ${likes.length} songs`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="play-liked__container">
        <div className="liked-btn__container">
          <PlayButton
            lastLikedSong={likes[0]}
            playing={playing}
            setIsPlaying={setIsPlaying}
            pauseSong={pauseSong}
            loggedInUser={loggedInUser}
            // songId={songId}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </div>
      </div>
      <div className="song-liked__container">
        <div className="liked-grid__container">
          <div role="presentation" id="presentation-container">
            <div className="presentation__row"># </div>
            <div className="presentation__row">TITLE</div>
            <div className="presentation__row margin-move">ALBUM</div>
            <div className="presentation__row">DATE ADDED</div>
            <div className="presentation__row">
              <QueryBuilderIcon
                style={{
                  width: "18px",
                  height: "18px",
                  // color: "#15883e",
                }}
              ></QueryBuilderIcon>
            </div>
            {/* <div className="presentation__row">⌚</div> */}
          </div>

          {hadLiked &&
            likes.map((lik, idx) => {
              idx++;
              return (
                <div
                  role="presentation"
                  className="presentation-container"
                  key={idx}
                  onMouseEnter={() => setDeleteShown(true)}
                  onMouseLeave={() => setDeleteShown(false)}
                >
                  <div className="presentation__row">
                    {deleteShown && (
                      <PlayButton
                        lastLikedSong={lik}
                        playing={playing}
                        setIsPlaying={setIsPlaying}
                        pauseSong={pauseSong}
                        loggedInUser={loggedInUser}
                        // songId={songId}
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                      />
                    )}
                    {/* {!playing && idx} */}
                    {!deleteShown && !playing && idx}
                    {playing && !deleteShown && (
                      <img src={eqGif} alt="loading..." />
                    )}
                    {/* {playing && !deleteShown && <h7>{idx}</h7>} */}
                  </div>
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
