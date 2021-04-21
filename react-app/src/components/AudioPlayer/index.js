import React, { useState } from "react";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";

import "react-h5-audio-player/lib/styles.css";
import "./AudioPlayer.css";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PictureInPictureAltIcon from "@material-ui/icons/PictureInPictureAlt";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import PlayButton from "../PlayButton/index";
const Player = ({
  drag,
  setDrag,
  loggedInUser,
  playing,
  setIsPlaying,
  pauseSong,
  currentSong,
  publicSongs,
  setMute,
  mute,
  seek,
  setSeek,
  wavesurfer,
}) => {
  const [songIsLoaded, setSongIsLoaded] = useState(false);

  // function ideas to mute sound of glitch
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

  // shuffle attempt
  let audio_url = [];
  let covert = publicSongs.map((song) => {
    audio_url.push(song.song);
  });
  let random_file = audio_url[Math.floor(Math.random() * audio_url.length)];
  let test;
  let founded = publicSongs?.filter((ele) =>
    ele?.song.toLowerCase().includes(random_file)
  );

  const task = (e) => {
    e.preventDefault();
    if (mute && playing) {
      document.querySelector(".rhap_button-clear.rhap_volume-button").click();
    }
  };

  const HandleSeek = (e) => {
    const { target } = e;
    const newSeek = +target.value;
    if (newSeek) {
      setSeek(newSeek);
      wavesurfer.current.seekTo(newSeek || 1);
    }
  };

  // console.log(volumeMute);
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

  async function onNext() {
    setIsPlaying(false);
    document.querySelector(".control-arrow.control-next").click();
    return await document.querySelector(".btn-play__active").click();
  }

  // let next = console.log(document.querySelector(".btn-play__active"));
  // if (next) {

  // }
  function onPrevious(e, cb) {
    e.preventDefault();
    return cb(document.querySelector(".control-arrow.control-prev").click());
  }

  let duration = 0;
  function onDuration(e) {
    e.preventDefault();
    duration = wavesurfer.current.getDuration();
  }
  console.log(duration);
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
                    marginLeft: "10px",
                    marginRight: "10px",
                    paddingBottom: "5px",
                  }}
                />
              </button>
            </div>
            <div className="see-artist__cover">
              {!drag && (
                <button onClick={() => setDrag(true)}>
                  <PictureInPictureAltIcon
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",
                      paddingBottom: "5px",
                    }}
                  />
                </button>
              )}
              {drag && (
                <button onClick={() => setDrag(false)}>
                  <PictureInPictureAltIcon
                    style={{
                      color: "#15883e",
                      marginLeft: "10px",
                      marginRight: "10px",
                      paddingBottom: "5px",
                    }}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
        {/* {mute && task()} */}
        {/* <div className="wave-minimap_dome"> */}
        {/* <div className="wave-minimap__container">
            <div id="wave-minimap" />
          </div> */}
        {/* </div> */}
        {console.log(wavesurfer.current)}

        <AudioPlayer
          // listenTracker={0}
          autoPlay={true}
          showJumpControls={false}
          showSkipControls={true}
          layout="stacked-reverse"
          src={currentSong?.song}
          onPlay={(e) => playSong(e)}
          onPause={(e) => pauseSong(e)}
          onClickNext={(e) => onNext(e)}
          onClickPrevious={(e) => onPrevious(e, pauseSong)}
          // onVolumeChange={onVolumeChange}
          // onSeeking={(e) => onDuration(e)}
          // customVolumeControls={[]}
          // volume={0}
          // onSeeked={HandleSeek}
          //  customVolumeControls={[RHAP_UI.VOLUME,]}
          customProgressBarSection={[
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION,
            // <input
            //   type="range"
            //   id="seek"
            //   name="seek"
            //   // waveSurfer recognize value of `0` same as `1`
            //   //  so we need to set some zero-ish value for silence
            //   min="0.01"
            //   max="1"
            //   step=".025"
            //   onChange={HandleSeek}
            //   defaultValue={seek}
            // />,
          ]}
          volume={1}

          // other props here
        />

        <div className="controllers-queue_screen">
          <div className="shuffle-btn">
            <ShuffleIcon
              style={{
                marginTop: "28px",
                fontSize: 28,
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
            <PlayButton
              foundedId={founded[0]?.id}
              founded={founded[0]}
              playing={playing}
              setIsPlaying={setIsPlaying}
              pauseSong={pauseSong}
              loggedInUser={loggedInUser}
            />
          </div>
          <div className="queue-music">
            <button>
              <QueueMusicIcon
                style={{
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
