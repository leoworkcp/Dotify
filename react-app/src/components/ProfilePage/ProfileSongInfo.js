import React from "react";
import { Link } from "react-router-dom";
import MessageDropdown from "../MessageDropdown/index";
const ProfileSongInfo = ({
  song,
  authenticated,
  setAuthenticated,
  loggedInUser,
}) => {
  // song is already the user songs NOTE
  // console.log(song);
  // console.log(song?.artist?.username);

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
        <div className="messageButtons">
          <MessageDropdown
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            songsId={song.id}
            song={song}
            loggedInUser={loggedInUser}
          />
        </div>
        <div className="album-cover">
          <img src={song.image_url} alt="profile-song" />
        </div>

        <Link to={`/song/${song.id}`}>
          <div className="song-profile__container">
            <div className="song-image__container">
              <img src={song?.artist?.profile_URL} alt="profile-song" />
            </div>
            <div className="song-description">
              <h3>{song.name}</h3>
              <p>{song?.artist?.username}</p>
            </div>
          </div>
          {/* <div className="song-audio__container">
            <audio className="no-outline" controls src={song.song}></audio>
          </div> */}
        </Link>
      </div>
    </>
  );
};

export default ProfileSongInfo;
