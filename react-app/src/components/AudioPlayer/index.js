import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
// import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";

// import "react-h5-audio-player/lib/styles.css";
import "./AudioPlayer.css";

import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PictureInPictureAltIcon from "@material-ui/icons/PictureInPictureAlt";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";

// new stuff
import RepeatIcon from "@material-ui/icons/Repeat";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import LoopIcon from "@material-ui/icons/Loop";

import PlayButton from "../PlayButton/index";
import WaveSurfer from "wavesurfer.js";
import Minimap from "wavesurfer.js/dist/plugin/wavesurfer.minimap.js";
import Regions from "wavesurfer.js/dist/plugin/wavesurfer.regions.js";

import { useParams } from "react-router";

// modal
import Modal from "react-modal";
import LogoutButton from "../auth/LogoutButton/index";
import LoginForm from "../auth/LoginForm/index";
import SignUpForm from "../auth/SignUpForm/index";
import { authenticate } from "../../store/auth";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 5,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#181818",
    border: "none",
  },
};

Modal.setAppElement("#root");
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
  authenticated,
  setAuthenticated,
}) => {
  const history = useHistory();

  const [loopActive, setLoopActive] = useState(false);
  const [repeatOnce, setRepeatOnce] = useState(false);
  const [songIsLoaded, setSongIsLoaded] = useState(false);
  const [volume, setVolume] = useState(0.75);
  // function ideas to mute sound of glitch
  const { songId } = useParams();

  // modal
  const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
  const [modalIsOpenSignUp, setIsOpenSignUp] = useState(false);

  function openModalLogin() {
    setIsOpenLogin(true);
  }

  function openModalSignUp() {
    setIsOpenSignUp(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModalLogin() {
    setIsOpenLogin(false);
  }

  function closeModalSignUp() {
    setIsOpenSignUp(false);
  }

  // modal ends

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
  // console.log(currentSong);
  const selectedSong = Object.values(publicSongs).find(
    (song) => song?.id == parseInt(songId)
  );

  // console.log(selectedSong);
  const [playings, setPlays] = useState(false);
  useEffect(() => {
    // setPlays(false);

    // const options = formWaveSurferOptions(waveformRef.current);
    // wavesurfer.current = WaveSurfer.create(options);

    // creating instance of  WaveSurfer waveForm

    // load waveForm and ProgressBar
    // console.log(songId);

    if (songId) {
      wavesurfer.current = WaveSurfer.create({
        container: "#wave-minimap",
        hideScrollbar: true,
        waveColor: "#b9bbbee3",
        cursorColor: "transparent",
        barWidth: 1,
        barRadius: 3,
        cursorWidth: 1,
        height: 45,
        barGap: 1,
        maxCanvasWidth: 100,
        normalize: true,
        partialRender: true,
        pixelRatio: 1,
        // loopSelection: true,
        progressColor: "#15883dbb",
        plugins: [
          Minimap.create({
            container: "#waveform",
            waveColor: "#fff",
            progressColor: "#15883dbb",
            // loopSelection: true,
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
    } else if (!songId && authenticated) {
      setPlays(false);

      // setSongIsLoaded(true);
      wavesurfer.current = WaveSurfer.create({
        container: "#wave-minimap",
        hideScrollbar: true,
        waveColor: "#b9bbbee3",
        cursorColor: "transparent",
        barWidth: 1,
        barRadius: 3,
        cursorWidth: 1,
        height: 45,
        barGap: 1,
        maxCanvasWidth: 100,
        normalize: true,
        partialRender: true,
        pixelRatio: 1,
        progressColor: "#15883dbb",
        // loopSelection: true,
      });

      wavesurfer.current.load(`${currentSong.song}`);
    }
    if (currentSong.song) {
      wavesurfer.current.on("ready", async function () {
        // https://wavesurfer-js.org/docs/methods.html

        await wavesurfer.current.play();
        setPlays(true);
        setSongIsLoaded(true);
        // setIsPlaying(true);

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
    if (wavesurfer.current) {
      return () => {
        wavesurfer.current.destroy();
      };
    }
  }, [`${currentSong.song}`, `${selectedSong?.song}`]);

  // const currentTime = wavesurfer.current.getCurrentTime();
  // const setTime = wavesurfer.current.setCurrentTime(seconds);
  // const getDuration = wavesurfer.current.getDuration();
  // const lastVolume = wavesurfer.current.getVolume();
  // console.log(lastVolume);
  // console.log(currentTime);
  // console.log(duration);
  // loop selection

  const loopSelect = () => {
    if (repeatOnce) {
      let btn = document.getElementById("RepeatIcon");
      btn.click();
    }

    setLoopActive(true);
    // adding and initializing a plugin after initialization
    const getDuration = wavesurfer.current.getDuration();
    // console.log(Math.round(getDuration));
    wavesurfer.current
      .addPlugin(
        Regions.create({
          regionsMinLength: 2,
          regions: [
            {
              start: 0,
              end: getDuration,
              loop: true,

              color: "#15883d5d",
              // color: "transparent",
            },
          ],
        })
      )
      .initPlugin("regions");
    document.getElementsByClassName("wavesurfer-region")[0].style.cssText =
      "position: absolute; z-index: 2; height: 100%; top: 0px; left: 0px; width: 540px; background-color: #15883d5d; cursor: pointer;";

    document.getElementsByClassName("wavesurfer-region")[0].innerHTML =
      "<handle class='wavesurfer-handle wavesurfer-handle-start' style='left: 0px; cursor: col-resize; position: absolute; top: 0px; width: 2px; height: 100%; background-color: rgb(255, 255, 255);'></handle><handle class='wavesurfer-handle wavesurfer-handle-end' style='right: 0px; cursor: col-resize; position: absolute; top: 0px; width: 2px; height: 100%; background-color: rgb(255, 255, 255);'></handle>";
  };
  const RepeatOnce = () => {
    if (loopActive) {
      let btn = document.getElementById("LoopIcon");
      btn.click();
    }
    setRepeatOnce(true);

    const getDuration = wavesurfer.current.getDuration();

    // adding and initializing a plugin after initialization
    wavesurfer.current
      .addPlugin(
        Regions.create({
          regionsMinLength: 2,
          regions: [
            {
              start: 0,
              end: getDuration,
              loop: true,

              color: "transparent",
            },
          ],
        })
      )
      .initPlugin("regions");

    document.getElementsByClassName("wavesurfer-region")[0].style.cssText =
      "position: absolute; z-index: 2; height: 100%; top: 0px; left: 0px; width: 540px; background-color: transparent; cursor: pointer;";

    document.getElementsByClassName("wavesurfer-region")[0].innerHTML = "";
  };

  const loopDeselect = () => {
    setLoopActive(false);
    setRepeatOnce(false);
    wavesurfer.current.destroyPlugin("regions");
  };
  // loop selection ends

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
  const newVolume2 = volume;
  const onVolumeMute = async (e) => {
    e.preventDefault();
    if (wavesurfer.current && volume > 0.01) {
      // const { target } = e;
      const newVolume = 0;
      const newVolume1 = volume;

      setVolume(newVolume);
      await wavesurfer.current.setVolume(newVolume);
      // if (volume === 0) {
      //   setVolume(newVolume1);
      //   await wavesurfer.current.setVolume(newVolume1 || 1);
      // }
    }
  };
  const onVolumeBack = async (e) => {
    e.preventDefault();
    if (wavesurfer.current) {
      // const { target } = e;
      // const newVolume = 1;
      const newVolume1 = 1;
      // setVolume(newVolume);
      // await wavesurfer.current.setVolume(newVolume);
      if (volume === 0 || volume === 0.01) {
        setVolume(newVolume1);
        await wavesurfer.current.setVolume(newVolume1 || 1);
      }
    }
  };

  const handlePlayPause = () => {
    if (playings && !playing && songIsLoaded) {
      wavesurfer.current.pause();

      // setMute(false);
    }
  };

  const handlePlay = () => {
    if (playings && playing && songIsLoaded) {
      wavesurfer.current.play();

      // setMute(true);
    }
  };

  const shuffleSongId = () => {
    if (songId) {
      history.push(`/song/${songId}`);
    }
  };

  // next song
  const nextSong = () => {
    console.log("2");
    if (songIsLoaded) {
      let next = document.getElementsByClassName("control-arrow control-next");
      console.log(next);
      for (let i = 0; i < next.length; i++) {
        // let s = next[i].className;
        // console.log(s);
        // console.log(next[i]);
        // let dom = !s.includes("disable");
        if (!next[i].className.includes("disable")) {
          console.log("1");
          return next[i].click();
        }
      }
    }
  };

  // next song ends
  // prev song
  const prevSong = () => {
    if (songIsLoaded) {
      let prev = document.getElementsByClassName("control-arrow control-prev");

      for (let i = 0; i < prev.length; i++) {
        if (!prev[i].className.includes("disable")) {
          console.log("1");
          return prev[i].click();
        }
      }
    }
  };
  // prev song ends
  useEffect(() => {
    if (volume === 0 || volume === 0.01) {
      setMute(true);
    } else {
      setMute(false);
    }
    if (!authenticated) {
      setDrag(false);
      setSongIsLoaded(false);
    }
    if (!authenticated && songIsLoaded) {
      return () => {
        wavesurfer.current.destroy();
      };
    }
    // if (!wavesurfer.current) setDrag(false);
  });
  // console.log(wavesurfer.current);
  return (
    <nav className="player-navBar">
      {authenticated && (
        <div className="player-navbar__container">
          <div className="container-playing">
            {songIsLoaded && authenticated && currentSong && (
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
                {authenticated && (
                  <button onClick={() => alert("feature in progress")}>
                    <FavoriteBorderIcon
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        paddingBottom: "5px",
                      }}
                    />
                  </button>
                )}
              </div>
              <div className="see-artist__cover">
                {authenticated && !songIsLoaded && (
                  <button onClick={() => setDrag(false)}>
                    <PictureInPictureAltIcon
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        paddingBottom: "5px",
                      }}
                    />
                  </button>
                )}
                {!drag && authenticated && songIsLoaded && (
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
                {drag && authenticated && songIsLoaded && (
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
            <div className="inline-container">
              {/* loop */}
              <div className="loop-controller__container">
                {authenticated && songIsLoaded && repeatOnce && (
                  <button id="RepeatIcon" onClick={() => loopDeselect()}>
                    <RepeatOneIcon
                      style={{
                        width: "26px",
                        height: "26px",
                        color: "#15883e",
                      }}
                    />
                  </button>
                )}
                {authenticated && songIsLoaded && !repeatOnce && (
                  <button id="RepeatIcon" onClick={() => RepeatOnce()}>
                    <RepeatIcon
                      style={{
                        width: "26px",
                        height: "26px",
                      }}
                    />
                  </button>
                )}
                {authenticated && !songIsLoaded && !repeatOnce && (
                  <button id="RepeatIcon">
                    <RepeatIcon
                      style={{
                        width: "26px",
                        height: "26px",
                      }}
                    />
                  </button>
                )}
              </div>

              {authenticated && (
                <button id="SkipPreviousIcon" onClick={() => prevSong()}>
                  <SkipPreviousIcon
                    style={{
                      width: "35px",
                      height: "35px",
                    }}
                  />
                </button>
              )}

              <PlayButton
                play={wavesurfer}
                playing={playing}
                setIsPlaying={setIsPlaying}
                pauseSong={pauseSong}
                loggedInUser={loggedInUser}
                songId={songId}
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
              {authenticated && (
                <button id="SkipNextIcon" onClick={() => nextSong()}>
                  <SkipNextIcon
                    style={{
                      width: "35px",
                      height: "35px",
                    }}
                  />
                </button>
              )}

              {/* loop */}
              <div className="loop-controller__container">
                {authenticated && songIsLoaded && loopActive && (
                  <button id="LoopIcon" onClick={() => loopDeselect()}>
                    <LoopIcon
                      style={{
                        width: "26px",
                        height: "26px",
                        color: "#15883e",
                      }}
                    />
                  </button>
                )}
                {authenticated && songIsLoaded && !loopActive && (
                  <button id="LoopIcon" onClick={() => loopSelect()}>
                    <LoopIcon
                      style={{
                        width: "26px",
                        height: "26px",
                      }}
                    />
                  </button>
                )}
                {authenticated && !songIsLoaded && !loopActive && (
                  <button id="LoopIcon">
                    <LoopIcon
                      style={{
                        width: "26px",
                        height: "26px",
                      }}
                    />
                  </button>
                )}
              </div>
              {/* loop ends */}
              <div className="volume">
                {authenticated && !songIsLoaded && (
                  <button>
                    <VolumeUpIcon />
                  </button>
                )}
                {!mute && authenticated && songIsLoaded && (
                  <button onClick={(e) => onVolumeMute(e)}>
                    <VolumeUpIcon />
                  </button>
                )}
                {mute && authenticated && songIsLoaded && (
                  <button onClick={(e) => onVolumeBack(e)}>
                    <VolumeOffIcon />
                  </button>
                )}

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
                  // defaultValue={volume}
                  value={volume}
                />
              </div>
            </div>
            {!playing && handlePlayPause()}
            {playing && handlePlay()}
            <div id="wave-minimap"></div>
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
                shuffleSongId={shuffleSongId}
                songId={songId}
                foundedId={founded[0]?.id}
                founded={founded[0]}
                playing={playing}
                setIsPlaying={setIsPlaying}
                pauseSong={pauseSong}
                loggedInUser={loggedInUser}
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            </div>
            <div className="queue-music">
              {authenticated && (
                <button onClick={() => alert("feature in progress")}>
                  <QueueMusicIcon
                    style={{
                      marginTop: "28px",
                      fontSize: 30,
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  />
                </button>
              )}
            </div>
            <div className="full-screen">
              <button onClick={() => alert("feature in progress")}>
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
      )}
      {!authenticated && (
        <div className="nav-noAuth__container">
          <div className="info-nav-noAuth">
            <p id="prev-noAuth">PREVIEW OF DOTIFY</p>
            <p id="signUp-noAuth">
              Sign up to get unlimited songs, discover new artists and upload
              your content. No credit card needed.
            </p>
          </div>
          <div className="signup-btn__navNoAuth">
            <button onClick={() => openModalLogin()}>SIGN UP FREE</button>
          </div>
          <Modal
            isOpen={modalIsOpenLogin}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModalLogin}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <LoginForm
              setIsOpenLogin={setIsOpenLogin}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              openModalSignUp={openModalSignUp}
              closeModalLogin={closeModalLogin}
            />
          </Modal>
          <Modal
            isOpen={authenticated === true ? false : modalIsOpenSignUp}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModalSignUp}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <SignUpForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              closeModalSignUp={closeModalSignUp}
              openModalLogin={openModalLogin}
            />
          </Modal>
        </div>
      )}
    </nav>
  );
};

export default Player;
