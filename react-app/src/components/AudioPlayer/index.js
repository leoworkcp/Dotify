import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./AudioPlayer.css";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PictureInPictureAltIcon from "@material-ui/icons/PictureInPictureAlt";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";

// maybe build the icon with arrows!!
// import CallMadeIcon from "@material-ui/icons/CallMade";
// import CallReceivedIcon from "@material-ui/icons/CallReceived";
// meantime use fullscreen icon!
import FullscreenIcon from "@material-ui/icons/Fullscreen";

// import { withStyles } from "@material-ui/styles";

// const CustomIconButton = withStyles({
//   root: {
//     color: "#b3b3b3",
//     // padding: "6px",
//     // position: "relative",
//     // zIndex: 0,
//     // boxSizing: "border-box",
//   },
// })(QueueMusicIcon);

const Player = ({ loggedInUser, authenticated, setAuthenticated }) => {
  window.addEventListener(
    "scroll",
    () => {
      document.body.style.setProperty(
        "--scroll",
        window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
      );
    },
    false
  );

  return (
    <nav className="player-navBar">
      <div className="player-navbar__container">
        <div className="container-playing">
          <div className="song-playing">
            <img
              src="https://i.scdn.co/image/ab67616d00004851963416bf0f5fb7373d412780"
              alt="song-cover"
            />
          </div>
          <div className="song-title__playing">
            <div className="name-artist">
              <NavLink className="song_id" to={`/profile/:song_id`}>
                Playa Playa
              </NavLink>
              <NavLink className="artist_id" to={`/profile/:artist_id`}>
                D'Angelo
              </NavLink>
            </div>
            <div className="like-artist__cover">
              <FavoriteBorderIcon
                style={{
                  color: "#b3b3b3",
                  // marginTop: "28px",
                  // fontSize: 28,
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
            </div>
            <div className="see-artist__cover">
              <PictureInPictureAltIcon
                style={{
                  color: "#b3b3b3",
                  // marginTop: "28px",
                  // fontSize: 28,
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
            </div>
          </div>
        </div>
        <AudioPlayer
          showJumpControls={false}
          showSkipControls={true}
          layout="stacked-reverse"
          autoPlay
          src="http://example.com/audio.mp3"
          onPlay={(e) => console.log("onPlay")}
          // other props here
        />
        <div className="controllers-queue_screen">
          <div className="queue-music">
            <QueueMusicIcon
              style={{
                color: "#b3b3b3",
                marginTop: "28px",
                fontSize: 28,
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
          </div>
          <div className="full-screen">
            <FullscreenIcon
              style={{
                color: "#b3b3b3",
                marginTop: "28px",
                fontSize: 28,
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Player;
