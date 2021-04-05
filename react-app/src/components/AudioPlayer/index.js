import React from "react";
// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
import "./AudioPlayer.css";
const Player = ({ loggedInUser, authenticated, setAuthenticated }) => {
  //   <AudioPlayer
  //     autoPlay
  //     src="http://example.com/audio.mp3"
  //     onPlay={(e) => console.log("onPlay")}
  //     // other props here
  //   />

  return (
    <nav className="player-navBar">
      <div className="player-navbar__container"></div>
    </nav>
  );
};

export default Player;
