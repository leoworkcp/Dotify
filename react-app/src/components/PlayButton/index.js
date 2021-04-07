import React, { useState } from "react";
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
}) => {
  // const [audio, setAudio] = useState(null);
  // const [playing, setIsPlaying] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch();

  console.log(founded);

  const setSong = (e) => {
    e.preventDefault();
    setIsPlaying(true);
    if (publicSong) dispatch(setCurrentSong(publicSong));
    if (song) dispatch(setCurrentSong(song));
    if (founded) dispatch(setCurrentSong(founded));

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
