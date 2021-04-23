import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import banner1 from "./banner1.jpg";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";
import Minimap from "wavesurfer.js/dist/plugin/wavesurfer.minimap.js";
import Timeline from "wavesurfer.js/dist/plugin/wavesurfer.timeline.js";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.js";
import "./SongPage.css";
import PlayButton from "../PlayButton/index";
import zIndex from "@material-ui/core/styles/zIndex";
const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#15883e",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  barWidth: 3,
  barRadius: 2,
  responsive: true,
  height: 150,

  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
  pixelRatio: 1,
  // plugins: [
  //   Minimap.create({
  //     container: "#wave-minimap",
  //     waveColor: "#eee",
  //     progressColor: "OrangeRed",
  //     height: 50,
  //   }),
  // ],
});

function SongPage({
  publicSongs,
  loaded,
  playing,
  setIsPlaying,
  pauseSong,
  mute,
  setMute,
  seek,
  setSeek,
  wavesurfer,
  currentSong,
  authenticated,
  setAuthenticated,
}) {
  const { songId } = useParams();
  const dispatch = useDispatch();

  const waveformRef = useRef(null);
  // const wavesurfer = useRef(null);

  const [playings, setPlays] = useState(false);
  const [volume, setVolume] = useState(1);
  const [time, setTime] = useState(0.5);

  const selectedSong = Object.values(publicSongs).find(
    (song) => song?.id == parseInt(songId)
  );
  // create new WaveSurfer instance
  // On component mount and when url changes

  // useEffect(() => {
  //   setPlays(false);

  //   // const options = formWaveSurferOptions(waveformRef.current);
  //   // wavesurfer.current = WaveSurfer.create(options);

  //   // creating instance of  WaveSurfer waveForm
  //   wavesurfer.current = WaveSurfer.create({
  //     container: "#waveform",

  //     waveColor: "#fff",
  //     cursorColor: "#15883e",
  //     barWidth: 1.5,
  //     // barRadius: 1,

  //     // barWidth: 3,
  //     barRadius: 3,
  //     cursorWidth: 1,
  //     height: 100,
  //     barGap: 3,
  //     // mediaControls: true,
  //     maxCanvasWidth: 100,
  //     // If true, normalize by the maximum peak instead of 1.0.
  //     normalize: true,
  //     // Use the PeakCache to improve rendering speed of large waveforms.
  //     partialRender: true,
  //     pixelRatio: 1,

  //     progressColor: "#15883dbb",
  //     // plugins: [
  //     //   Minimap.create({
  //     //     container: "#wave-minimap",
  //     //     waveColor: "#b9bbbee3",
  //     //     progressColor: "#15883dbb",
  //     //     height: 45,
  //     //     // barWidth: 50,
  //     //     cursorWidth: 20,
  //     //     // barMinHeight: 10,
  //     //     cursorColor: "transparent",
  //     //     barGap: 1,
  //     //     customShowTimeStyle: {
  //     //       "background-color": "#df0000",
  //     //       // color: "#fff",
  //     //       // height: "50px",
  //     //       // width: "50px",
  //     //       // padding: "2px",
  //     //       "font-size": "10px",
  //     //       "border-radius": "10px",
  //     //     },
  //     //   }),
  //     //   // Timeline.create({
  //     //   //   container: "#wave-timeline",
  //     //   //   // ... other timeline options
  //     //   //   zIndex: 14,
  //     //   //   // opacity: 1,
  //     //   // }),
  //     //   // CursorPlugin.create({
  //     //   //   cursorColor: "#fff",
  //     //   //   showTime: true,
  //     //   //   zIndex: 14,
  //     //   //   // opacity: 1,
  //     //   //   customShowTimeStyle: {
  //     //   //     "background-color": "#df0000",
  //     //   //     color: "#fff",
  //     //   //     height: "30px",
  //     //   //     // padding: "2px",
  //     //   //     "font-size": "10px",
  //     //   //   },
  //     //   // }),
  //     // ],
  //   });

  //   // load waveForm and ProgressBar
  //   wavesurfer.current.load(`${selectedSong.song}`);

  //   wavesurfer.current.on("ready", function () {
  //     // https://wavesurfer-js.org/docs/methods.html
  //     // wavesurfer.current.play();
  //     setPlays(true);

  //     // make sure object still available when file loaded
  //     if (wavesurfer.current) {
  //       wavesurfer.current.setVolume(volume);
  //       setVolume(volume);
  //       wavesurfer.current.audioRate(time);
  //       setTime(time);
  //     }
  //   });

  //   // Removes events, elements and disconnects Web Audio nodes.
  //   // when component unmount
  //   return () => {
  //     wavesurfer.current.destroy();
  //   };
  // }, [`${selectedSong.song}`]);

  // console.log(playing);

  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;
    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };
  const onVolumeMute = (e) => {
    const { target } = e;
    const newVolume = 0;
    const newVolume1 = volume;

    setVolume(newVolume);
    wavesurfer.current.setVolume(newVolume);
    if (volume === 0) {
      setVolume(newVolume1);
      wavesurfer.current.setVolume(newVolume1 || 1);
    }
    console.log(volume);
  };
  // console.log(volume);
  const onTimeChange = (e) => {
    const { target } = e;
    const newTime = +target.value;
    if (newTime) {
      setVolume(newTime);
      wavesurfer.current.setTime(newTime || 1);
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

  // console.log(wavesurfer);
  // console.log(selectedSong);

  return (
    <div>
      <div className="song_page" key={selectedSong?.id}>
        <img src={banner1} alt="banner" />
        <div className="profile-username songPage">
          <NavLink to={`/profile/${selectedSong.artist?.id}`}>
            <h1>{selectedSong.artist.username}</h1>
          </NavLink>
        </div>
        {/* <div id="container">
                <div id="waveform" ref={waveformRef} />
              </div> */}
        {/* <div id="wave-minimap" /> */}
        {/* <div className="volume">
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
          <button onClick={(e) => onVolumeMute(e)}>🔊</button>
        </div> */}
        {/* <div className="seek">
          <input
            type="range"
            id="seek"
            name="seek"
            // waveSurfer recognize value of `0` same as `1`
            //  so we need to set some zero-ish value for silence
            min="0.01"
            max="1"
            step=".025"
            onChange={HandleSeek}
            defaultValue={seek}
          />
        
        </div> */}
        <div className="full-song__container">
          <PlayButton
            play={wavesurfer}
            selectedSong={selectedSong}
            pauseSong={pauseSong}
            playing={playing}
            setIsPlaying={setIsPlaying}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
          <div className="cover-div">
            <img src={selectedSong.image_url} alt="song-cover" />
          </div>
          <div className="fullX-song__container">
            <div className="song-page__title">
              <h1>{selectedSong.name}</h1>
              <h2>{selectedSong.category}</h2>
            </div>
            <div id="waveform" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongPage;
