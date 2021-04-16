import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setCurrentSong } from "../../store/playing";
import "./PlayButton.css";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
const PlayButton = ({
  publicSong,
  playing,
  setIsPlaying,
  pauseSong,
  song,
  founded,
  loggedInUser,
  selectedSong,
  play,
}) => {
  // const [audio, setAudio] = useState(null);
  // const [playing, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();

  let a = document.querySelector(".rhap_progress-section");
  // console.log(founded);
  // console.log(selectedSong);

  const setSong = (e) => {
    e.preventDefault();
    if (isReady) {
      play.current.play();
    }
    setIsPlaying(true);

    if (publicSong) dispatch(setCurrentSong(publicSong));
    if (song) dispatch(setCurrentSong(song));
    if (founded) dispatch(setCurrentSong(founded));
    if (selectedSong && !isReady) {
      play.current.play();
      setIsReady(true);

      // a.innerHTML = "";
      return dispatch(setCurrentSong(selectedSong));
    }
    document
      .querySelector(
        ".rhap_button-clear.rhap_main-controls-button.rhap_play-pause-button"
      )
      .click();
  };

  const pausesSong = (e) => {
    e.preventDefault();

    setIsPlaying(false);
    document
      .querySelector(
        ".rhap_button-clear.rhap_main-controls-button.rhap_play-pause-button"
      )
      .click();
    if (selectedSong) {
      play.current.pause();
    }
  };

  return (
    <>
      <div className="PlayButton">
        {!playing && (
          <button className="btn-play__active" onClick={(e) => setSong(e)}>
            <PlayArrowIcon
              style={{
                fontSize: 40,
              }}
            />
          </button>
        )}
        {playing && (
          <button className="btn-pause__active" onClick={(e) => pausesSong(e)}>
            <PauseIcon
              style={{
                fontSize: 40,
              }}
            />
          </button>
        )}
      </div>
    </>
  );
};

export default PlayButton;
