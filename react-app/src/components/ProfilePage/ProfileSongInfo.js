import React from "react";
import { Link } from "react-router-dom";
import MessageDropdown from "../MessageDropdown/index";
const ProfileSongInfo = ({ song, authenticated, setAuthenticated }) => {
  return (
    <>
      <div
        className="profile-songs-container"
        // style={{
        //   backgroundImage: `url("${song.image_url}")`,
        //   backgroundRepeat: "no-repeat",
        //   width: "320px",
        //   // height: "300x",
        // }}
      >
        {/* <img src={song.image_url} alt="profile-song" /> */}
        <div className="messageButtons">
          <MessageDropdown
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            songsId={song.id}
          />
        </div>
        <Link id="profile-song-link" to={`/song/${song.id}`}>
          <div className="song-image__container">
            <img
              id="profile-song-image"
              src={song.image_url}
              alt="profile-song"
            />
          </div>
          <div className="song-name">{song.name}</div>
          <div className="song-description">
            <h3>Category</h3>
            <p>{song.category}</p>
            <h3>Description</h3>
            <p>{song.description}</p>
          </div>
          <div className="song-audio__container">
            <audio className="no-outline" controls src={song.song}></audio>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProfileSongInfo;
