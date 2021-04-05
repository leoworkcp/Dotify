import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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
import ShuffleIcon from "@material-ui/icons/Shuffle";
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

const Player = ({
  loggedInUser,
  authenticated,
  setAuthenticated,
  playing,
  setIsPlaying,
  pauseSong,
}) => {
  const [songIsLoaded, setSongIsLoaded] = useState(false);

  // const allSongs = useSelector((state) => state.songs);

  const currentSong = useSelector((state) => state.playing);
  console.log(currentSong?.image_url);

  function muteMe(elem) {
    elem.muted = true;
    elem.pause();
  }
  function mutePage() {
    var elems = document.querySelectorAll("video, audio");

    [].forEach.call(elems, function (elem) {
      muteMe(elem);
    });
  }
  function audioGlitch(e) {
    e.preventDefault();
    setTimeout(mutePage, 1000);
  }

  const playSong = () => {
    setIsPlaying(true);
    setSongIsLoaded(true);
  };

  // // actions
  // onAbort={action('onAbort')}
  //  onCanPlay={action('onCanPlay')}
  //  onCanPlayThrough={action('onCanPlayThrough')}
  //   onEnded={action('onEnded')}
  //   onPlaying={action('onPlaying')}
  //   onSeeking={action('onSeeking')}
  //   onSeeked={action('onSeeked')}
  //   onLoadStart={action('onLoadStart')}
  //   onLoadedMetaData={action('onLoadedMetaData')}
  //   onLoadedData={action('onLoadedData')}
  //   onError={action('onError')}
  //   onListen={action('onListen')}
  //   onVolumeChange={action('onVolumeChange')}
  //   onPause={action('onPause')}
  //   onPlay={action('onPlay')}
  //   onClickPrevious={action('onClickPrevious')}
  //   onClickNext={action('onClickNext')}
  //   volume={0.8}
  //   // actions ends

  console.log(currentSong?.artist?.username);
  return (
    <nav className="player-navBar">
      <div className="player-navbar__container">
        <div className="container-playing">
          {songIsLoaded && (
            <div className="song-playing">
              <img src={currentSong?.image_url} alt="song-cover" />
            </div>
          )}
          <div className="song-title__playing">
            <div className="name-artist">
              <NavLink className="song_id" to={`/song/${currentSong?.id}`}>
                {currentSong?.name}
              </NavLink>
              <NavLink
                className="artist_id"
                to={`/profile/${currentSong?.artist_id}`}
              >
                {currentSong?.artist?.username}
              </NavLink>
            </div>
            <div className="like-artist__cover">
              <button>
                <FavoriteBorderIcon
                  style={{
                    // color: "#b3b3b3",
                    // marginTop: "28px",
                    // fontSize: 28,
                    marginLeft: "10px",
                    marginRight: "10px",
                    paddingBottom: "5px",
                  }}
                />
              </button>
            </div>
            <div className="see-artist__cover">
              <button>
                <PictureInPictureAltIcon
                  style={{
                    // color: "#b3b3b3",
                    // marginTop: "28px",
                    // fontSize: 28,
                    marginLeft: "10px",
                    marginRight: "10px",
                    paddingBottom: "5px",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
        <AudioPlayer
          showJumpControls={false}
          showSkipControls={true}
          layout="stacked-reverse"
          // autoPlay
          src={currentSong?.song}
          onPlay={(e) => playSong(e)}
          onPause={(e) => pauseSong(e)}
          // other props here
        />
        <div className="controllers-queue_screen">
          <div className="shuffle-btn">
            <button>
              <ShuffleIcon
                style={{
                  // color: "#b3b3b3",
                  marginTop: "28px",
                  fontSize: 28,
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
            </button>
          </div>
          <div className="queue-music">
            <button>
              <QueueMusicIcon
                style={{
                  // color: "#b3b3b3",
                  marginTop: "28px",
                  fontSize: 30,
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
            </button>
          </div>
          <div className="full-screen">
            <button>
              <FullscreenIcon
                style={{
                  // color: "#b3b3b3",
                  marginTop: "28px",
                  fontSize: 30,
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Player;
