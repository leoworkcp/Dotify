import React, { useEffect, useRef, useState } from "react";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";

import "react-h5-audio-player/lib/styles.css";
import "./AudioPlayer.css";

import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PictureInPictureAltIcon from "@material-ui/icons/PictureInPictureAlt";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import PlayButton from "../PlayButton/index";
import WaveSurfer from "wavesurfer.js";
import Minimap from "wavesurfer.js/dist/plugin/wavesurfer.minimap.js";
import { useParams } from "react-router";
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
  const [volume, setVolume] = useState(1);
  // function ideas to mute sound of glitch
  const { songId } = useParams();

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

  // new stuff
  console.log(currentSong);
  const selectedSong = Object.values(publicSongs).find(
    (song) => song?.id == parseInt(songId)
  );

  console.log(selectedSong);
  const [playings, setPlays] = useState(false);
  useEffect(() => {
    // setPlays(false);

    // const options = formWaveSurferOptions(waveformRef.current);
    // wavesurfer.current = WaveSurfer.create(options);

    // creating instance of  WaveSurfer waveForm

    // load waveForm and ProgressBar
    console.log(songId);

    if (songId) {
      wavesurfer.current = WaveSurfer.create({
        container: "#wave-minimap",

        waveColor: "#b9bbbee3",
        cursorColor: "transparent",
        barWidth: 1.5,
        barRadius: 3,
        cursorWidth: 1,
        height: 45,
        barGap: 1,
        maxCanvasWidth: 100,
        normalize: true,
        partialRender: true,
        pixelRatio: 1,

        progressColor: "#15883dbb",
        plugins: [
          Minimap.create({
            container: "#waveform",
            waveColor: "#fff",
            progressColor: "#15883dbb",
            height: 100,
            // barWidth: 50,
            cursorWidth: 1,
            // barMinHeight: 10,
            cursorColor: "transparent",
            barGap: 3,
          }),
        ],
      });

      wavesurfer.current.load(`${selectedSong.song}`);
    } else {
      setPlays(false);

      // setSongIsLoaded(true);
      wavesurfer.current = WaveSurfer.create({
        container: "#wave-minimap",
        waveColor: "#b9bbbee3",
        cursorColor: "transparent",
        barWidth: 1.5,
        barRadius: 3,
        cursorWidth: 1,
        height: 45,
        barGap: 1,
        maxCanvasWidth: 100,
        normalize: true,
        partialRender: true,
        pixelRatio: 1,
        progressColor: "#15883dbb",
      });

      wavesurfer.current.load(`${currentSong.song}`);
    }
    if (currentSong.song) {
      wavesurfer.current.on("ready", async function () {
        // https://wavesurfer-js.org/docs/methods.html

        await wavesurfer.current.play();
        setPlays(true);
        setSongIsLoaded(true);
        setIsPlaying(true);
        // make sure object still available when file loaded
        if (wavesurfer.current) {
          wavesurfer.current.setVolume(volume);
          setVolume(volume);
          // wavesurfer.current.audioRate(time);
          // setTime(time);
        }
      });
    }

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount

    return () => {
      wavesurfer.current.destroy();
    };
  }, [`${currentSong.song}`, `${selectedSong?.song}`]);
  // ends new stuff

  const onVolumeChange = (e) => {
    if (currentSong.song) {
      const { target } = e;
      const newVolume = +target.value;
      if (newVolume) {
        setVolume(newVolume);
        wavesurfer.current.setVolume(newVolume || 1);
      }
    }
  };
  const onVolumeMute = (e) => {
    if (currentSong.song) {
      const { target } = e;
      const newVolume = 0;
      const newVolume1 = volume;

      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume);
      if (volume === 0) {
        setVolume(newVolume1);
        wavesurfer.current.setVolume(newVolume1 || 1);
      }
    }

    // console.log(volume);
  };

  const handlePlayPause = () => {
    if (playings && !playing) {
      wavesurfer.current.pause();

      setMute(false);
    }
  };

  const handlePlay = () => {
    if (playings && playing) {
      wavesurfer.current.play();

      setMute(true);
    }
  };

  // console.log(duration);
  return (
    <nav className="player-navBar">
      <div className="player-navbar__container">
        <div className="container-playing">
          {console.log(songIsLoaded)}
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

        <div className="audio_player__container">
          <PlayButton
            play={wavesurfer}
            playing={playing}
            setIsPlaying={setIsPlaying}
            pauseSong={pauseSong}
            loggedInUser={loggedInUser}
            songId={songId}
          />
          {!playing && handlePlayPause()}
          {playing && handlePlay()}
          <div id="wave-minimap"></div>
          <div className="volume">
            <button onClick={(e) => onVolumeMute(e)}>🔊</button>
            <input
              type="range"
              id="volume"
              name="volume"
              // waveSurfer recognize value of `0` same as `1`
              //  so we need to set some zero-ish value for silence
              min="0.01"
              max="1"
              step=".025"
              onChange={onVolumeChange}
              defaultValue={volume}
            />
          </div>
        </div>
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
