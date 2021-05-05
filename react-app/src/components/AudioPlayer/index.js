import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// like feat
import { useDispatch, useSelector } from "react-redux";
import * as likeActions from "../../store/likes";

import "./AudioPlayer.css";
import eqGif from "../LikedSongs/equalizerGIF.gif";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PictureInPictureAltIcon from "@material-ui/icons/PictureInPictureAlt";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";

import RepeatIcon from "@material-ui/icons/Repeat";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import LoopIcon from "@material-ui/icons/Loop";
import Tooltip from "@material-ui/core/Tooltip";
import PlayButton from "../PlayButton/index";
import WaveSurfer from "wavesurfer.js";
import Minimap from "wavesurfer.js/dist/plugin/wavesurfer.minimap.js";
import Regions from "wavesurfer.js/dist/plugin/wavesurfer.regions.js";

import { useParams } from "react-router";

// modal
import Modal from "react-modal";
import LoginForm from "../auth/LoginForm/index";
import SignUpForm from "../auth/SignUpForm/index";

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
  userid,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loopActive, setLoopActive] = useState(false);
  const [repeatOnce, setRepeatOnce] = useState(false);
  const [songIsLoaded, setSongIsLoaded] = useState(false);
  const [volume, setVolume] = useState(0.75);
  // function ideas to mute sound of glitch
  const { songId } = useParams();
  // const likes = useSelector((state) => state?.likes);
  // console.log(likes);
  // like song feature
  // const [likesChanged, setLikesChanged] = useState(false);
  const [hadLiked, setHadLiked] = useState(false);
  const handleAddLike = (e, songId) => {
    e.stopPropagation();
    dispatch(likeActions.addLike(songId, loggedInUser.id));
    // setLikesChanged(true);
    // setHadLiked(true)
  };

  const handleRemoveLike = (e, songId) => {
    e.stopPropagation();
    dispatch(likeActions.removeLike(songId, loggedInUser.id));
    // setLikesChanged(false);
    //  setHadLiked(false);
  };

  // like song feature ends

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

  // function muteMe(elem) {
  //   elem.muted = true;
  //   elem.pause();
  // }

  // function mutePage() {
  //   var elems = document.querySelectorAll("video, audio");

  //   [].forEach.call(elems, function (elem) {
  //     muteMe(elem);
  //   });
  // }

  // function audioGlitch(e) {
  //   e.preventDefault();
  //   setTimeout(mutePage, 1000);
  // }

  // shuffle attempt
  let audio_url = [];
  let covert = publicSongs.map((song) => {
    return audio_url.push(song.song);
  });
  let random_file = audio_url[Math.floor(Math.random() * audio_url.length)];

  let founded = publicSongs?.filter((ele) =>
    ele?.song.toLowerCase().includes(random_file)
  );

  // const task = (e) => {
  //   e.preventDefault();
  //   if (mute && playing) {
  //     document.querySelector(".rhap_button-clear.rhap_volume-button").click();
  //   }
  // };

  // const HandleSeek = (e) => {
  //   const { target } = e;
  //   const newSeek = +target.value;
  //   if (newSeek) {
  //     setSeek(newSeek);
  //     wavesurfer.current.seekTo(newSeek || 1);
  //   }
  // };

  // console.log(volumeMute);

  // async function onNext() {
  //   setIsPlaying(false);
  //   document.querySelector(".control-arrow.control-next").click();
  //   return await document.querySelector(".btn-play__active").click();
  // }

  // // let next = console.log(document.querySelector(".btn-play__active"));

  // function onPrevious(e, cb) {
  //   e.preventDefault();
  //   return cb(document.querySelector(".control-arrow.control-prev").click());
  // }

  // let duration = 0;
  // function onDuration(e) {
  //   e.preventDefault();
  //   duration = wavesurfer.current.getDuration();
  // }

  // loading flag
  function UpdateLoadingFlag(Percentage) {
    if (document.getElementById("loading_flag")) {
      document.getElementById("loading_flag").innerText =
        "Loading " + Percentage + "%";
      if (Percentage >= 100) {
        document.getElementById("loading_flag").style.display = "none";
        document.getElementById("position-relative_loading").style.display =
          "none";
      } else {
        document.getElementById("position-relative_loading").style.display =
          "block";
        document.getElementById("loading_flag").style.display = "flex";
      }
    }
  }
  // loading flag ends
  // console.log(currentSong);
  const selectedSong = Object.values(publicSongs).find(
    (song) => Number(song?.id) === parseInt(songId)
  );
  let currCheck = currentSong?.song;
  let selectCheck = selectedSong?.song;
  // console.log(currentSong);
  // console.log(selectedSong);
  const [playings, setPlays] = useState(false);
  useEffect(() => {
    if (songId && currCheck) {
      // setIsPlaying(false);
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
      wavesurfer.current.on("loading", function (X, evt) {
        UpdateLoadingFlag(X);
      });
      wavesurfer.current.load(`${selectCheck}`);
    } else if (!songId && authenticated && currCheck) {
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
      wavesurfer.current.on("loading", function (X, evt) {
        UpdateLoadingFlag(X);
      });
    }
    if (currCheck) {
      wavesurfer.current.load(`${currCheck}`);
      wavesurfer.current.on("ready", async function () {
        // https://wavesurfer-js.org/docs/methods.html

        await wavesurfer.current.play();
        setPlays(true);
        setSongIsLoaded(true);
        setIsPlaying(true);

        // make sure object still available when file loaded
        // if (wavesurfer.current) {
        //   wavesurfer.current.setVolume(volume);
        //   setVolume(volume);
        //   // wavesurfer.current.audioRate(time);
        //   // setTime(time);
        // }
      });
    }

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    if (wavesurfer.current) {
      return () => {
        wavesurfer.current.destroy();
      };
    }
  }, [
    currCheck,
    selectCheck,
    authenticated,
    setIsPlaying,
    songId,
    // volume,
    wavesurfer,
  ]);

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
  // const newVolume2 = volume;

  const onVolumeMute = async (e) => {
    e.preventDefault();
    if (wavesurfer.current && volume > 0.01) {
      // const { target } = e;
      const newVolume = 0;
      // const newVolume1 = volume;

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
    if (songIsLoaded) {
      let next = document.getElementsByClassName("control-arrow control-next");
      // console.log(next);
      for (let i = 0; i < next.length; i++) {
        // let s = next[i].className;
        // console.log(s);
        // console.log(next[i]);
        // let dom = !s.includes("disable");
        if (!next[i].className.includes("disable")) {
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
  }, [volume, authenticated, songIsLoaded, setMute, setDrag, wavesurfer]);
  // console.log(wavesurfer.current);

  // const hasLikes = useSelector((state) => state?.likes);

  const likedUser = useSelector((state) =>
    state?.likes
      .map((like) =>
        Object.values(publicSongs).find(
          (song) =>
            Number(song?.id) === parseInt(like) &&
            song?.artist_id !== parseInt(userid)
        )
      )
      .filter((s) => s !== undefined)
  );

  const playingLiked = likedUser.filter((l) =>
    l.name.includes(currentSong.name)
  );

  const playingOwnLiked = String(currentSong.artist_id) === String(userid);

  useEffect(() => {
    if (playingLiked.length > 0) setHadLiked(true);
    else if (playingLiked.length === 0) setHadLiked(false);
  }, [playingLiked]);

  useEffect(() => {
    if (wavesurfer.current && playing) {
      wavesurfer.current.setVolume(volume);
      setVolume(volume);
      // wavesurfer.current.audioRate(time);
      // setTime(time);
    }
  }, [volume, wavesurfer, playing]);

  useEffect(() => {
    if (userid) dispatch(likeActions.fetchUserLikes(userid));
  }, [dispatch, userid]);
  // const [loading, setLoading] = useState(false);
  // testing loading

  // console.log(currentSong.song);
  // console.log(loading);
  // testing loading ends

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
                {authenticated && !songIsLoaded && (
                  <Tooltip title="Add to Your Likes" arrow>
                    <button>
                      <FavoriteBorderIcon
                        style={{
                          marginLeft: "10px",
                          marginRight: "10px",
                          paddingBottom: "5px",
                        }}
                      />
                    </button>
                  </Tooltip>
                )}
                {authenticated &&
                  songIsLoaded &&
                  !hadLiked &&
                  !playingOwnLiked && (
                    <Tooltip title="Save to Your Likes" arrow>
                      <button
                        onClick={(e) => handleAddLike(e, currentSong?.id)}
                      >
                        <FavoriteBorderIcon
                          style={{
                            marginLeft: "10px",
                            marginRight: "10px",
                            paddingBottom: "5px",
                          }}
                        />
                      </button>
                    </Tooltip>
                  )}
                {authenticated && songIsLoaded && hadLiked && !playingOwnLiked && (
                  <Tooltip title="Remove from Your Likes" arrow>
                    <button
                      onClick={(e) => handleRemoveLike(e, currentSong?.id)}
                    >
                      <FavoriteIcon
                        style={{
                          marginLeft: "10px",
                          marginRight: "10px",
                          paddingBottom: "5px",
                          color: "#15883e",
                        }}
                      />
                    </button>
                  </Tooltip>
                )}
              </div>
              <div className="see-artist__cover">
                {authenticated && !songIsLoaded && (
                  <Tooltip title="Song Cover" arrow>
                    <button onClick={() => setDrag(false)}>
                      <PictureInPictureAltIcon
                        style={{
                          marginLeft: "10px",
                          marginRight: "10px",
                          paddingBottom: "5px",
                        }}
                      />
                    </button>
                  </Tooltip>
                )}
                {!drag && authenticated && songIsLoaded && (
                  <Tooltip title="Show Cover" arrow>
                    <button onClick={() => setDrag(true)}>
                      <PictureInPictureAltIcon
                        style={{
                          marginLeft: "10px",
                          marginRight: "10px",
                          paddingBottom: "5px",
                        }}
                      />
                    </button>
                  </Tooltip>
                )}
                {drag && authenticated && songIsLoaded && (
                  <Tooltip title="Hide Cover" arrow>
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
                  </Tooltip>
                )}
              </div>
            </div>
          </div>

          <div className="audio_player__container">
            <div className="inline-container">
              {/* loop */}
              <div className="loop-controller__container">
                {authenticated && songIsLoaded && repeatOnce && (
                  <Tooltip title="Disable Repeat" arrow>
                    <button id="RepeatIcon" onClick={() => loopDeselect()}>
                      <RepeatOneIcon
                        style={{
                          width: "26px",
                          height: "26px",
                          color: "#15883e",
                        }}
                      />
                    </button>
                  </Tooltip>
                )}
                {authenticated && songIsLoaded && !repeatOnce && (
                  <Tooltip title="Enable Repeat One" arrow>
                    <button id="RepeatIcon" onClick={() => RepeatOnce()}>
                      <RepeatIcon
                        style={{
                          width: "26px",
                          height: "26px",
                        }}
                      />
                    </button>
                  </Tooltip>
                )}
                {authenticated && !songIsLoaded && !repeatOnce && (
                  <Tooltip title="Enable Repeat" arrow>
                    <button id="RepeatIcon">
                      <RepeatIcon
                        style={{
                          width: "26px",
                          height: "26px",
                        }}
                      />
                    </button>
                  </Tooltip>
                )}
              </div>

              {authenticated && (
                <Tooltip title="Previous" arrow>
                  <button id="SkipPreviousIcon" onClick={() => prevSong()}>
                    <SkipPreviousIcon
                      style={{
                        width: "35px",
                        height: "35px",
                      }}
                    />
                  </button>
                </Tooltip>
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
                <Tooltip title="Next" arrow>
                  <button id="SkipNextIcon" onClick={() => nextSong()}>
                    <SkipNextIcon
                      style={{
                        width: "35px",
                        height: "35px",
                      }}
                    />
                  </button>
                </Tooltip>
              )}

              {/* loop */}
              <div className="loop-controller__container">
                {authenticated && songIsLoaded && loopActive && (
                  <Tooltip title="Disable Loop Selector" arrow>
                    <button id="LoopIcon" onClick={() => loopDeselect()}>
                      <LoopIcon
                        style={{
                          width: "26px",
                          height: "26px",
                          color: "#15883e",
                        }}
                      />
                    </button>
                  </Tooltip>
                )}
                {authenticated && songIsLoaded && !loopActive && (
                  <Tooltip title="Enable Loop Selector" arrow>
                    <button id="LoopIcon" onClick={() => loopSelect()}>
                      <LoopIcon
                        style={{
                          width: "26px",
                          height: "26px",
                        }}
                      />
                    </button>
                  </Tooltip>
                )}
                {authenticated && !songIsLoaded && !loopActive && (
                  <Tooltip title="Loop Selector" arrow>
                    <button id="LoopIcon">
                      <LoopIcon
                        style={{
                          width: "26px",
                          height: "26px",
                        }}
                      />
                    </button>
                  </Tooltip>
                )}
              </div>
              {/* loop ends */}
              <div className="volume">
                {authenticated && !songIsLoaded && (
                  <Tooltip title="Volume" arrow>
                    <button>
                      <VolumeUpIcon />
                    </button>
                  </Tooltip>
                )}
                {!mute && authenticated && songIsLoaded && (
                  <Tooltip title="Mute" arrow>
                    <button onClick={(e) => onVolumeMute(e)}>
                      <VolumeUpIcon />
                    </button>
                  </Tooltip>
                )}
                {mute && authenticated && songIsLoaded && (
                  <Tooltip title="Unmute" arrow>
                    <button onClick={(e) => onVolumeBack(e)}>
                      <VolumeOffIcon />
                    </button>
                  </Tooltip>
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

            <div id="wave-minimap">
              <div id="position-relative_loading">
                <div id="loading_flag"></div>
              </div>
            </div>
          </div>
          <div className="controllers-queue_screen">
            <Tooltip title="Shuffle" arrow>
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
            </Tooltip>
            <div className="queue-music">
              {authenticated && (
                <Tooltip title="Queue" arrow>
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
                </Tooltip>
              )}
            </div>
            <div className="full-screen">
              <Tooltip title="Full Screen" arrow>
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
              </Tooltip>
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
