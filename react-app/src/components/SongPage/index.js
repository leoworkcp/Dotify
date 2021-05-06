import React from "react";

// import { useDispatch } from "react-redux";

import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import MessageDropdown from "../MessageDropdown/index";
import "./SongPage.css";
import PlayButton from "../PlayButton/index";

function SongPage({
  publicSongs,
  playing,
  setIsPlaying,
  pauseSong,
  wavesurfer,
  authenticated,
  setAuthenticated,
}) {
  const { songId } = useParams();
  // const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state?.session.user);
  const userid = loggedInUser?.id;
  const selectedSong = Object.values(publicSongs).find(
    (song) => Number(song?.id) === parseInt(songId)
  );

  return (
    <div className="SongPage__Container">
      <div className="song_page" key={selectedSong?.id}>
        <div className="song-page__banner"></div>
        <div className="profile-username songPage">
          <NavLink to={`/profile/${selectedSong.artist?.id}`}>
            <h1>{selectedSong.artist.username}</h1>
          </NavLink>
        </div>

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
            <div className="legend">
              <MessageDropdown
                songsId={selectedSong.id}
                song={selectedSong}
                loggedInUser={loggedInUser}
                userid={userid}
              />
            </div>
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
