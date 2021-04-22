import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setCurrentSong } from "../../store/playing";
import "./PlayButton.css";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import WaveSurfer from "wavesurfer.js";
import Minimap from "wavesurfer.js/dist/plugin/wavesurfer.minimap.js";
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
  songId,
}) => {
  // const [audio, setAudio] = useState(null);
  // const [playing, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();

  // console.log(founded);
  // console.log(selectedSong);
  // console.log(songId);
  useEffect(() => {
    if (selectedSong) dispatch(setCurrentSong(selectedSong));
  }, [selectedSong]);
  console.log(play);
  const setSong = (e) => {
    e.preventDefault();

    setIsPlaying(true);
    // setPlays(true);
    if (publicSong) dispatch(setCurrentSong(publicSong));
    if (song) dispatch(setCurrentSong(song));
    if (founded) dispatch(setCurrentSong(founded));

    // document
    //   .querySelector(
    //     ".rhap_button-clear.rhap_main-controls-button.rhap_play-pause-button"
    //   )
    //   .click();
  };

  const pausesSong = (e) => {
    e.preventDefault();

    // document
    //   .querySelector(
    //     ".rhap_button-clear.rhap_main-controls-button.rhap_play-pause-button"
    //   )
    //   .click();

    if (playing) {
      setIsPlaying(false);
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
