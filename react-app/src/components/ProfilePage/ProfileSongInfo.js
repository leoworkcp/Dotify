import React from "react";
import { Link } from "react-router-dom";
import MessageDropdown from "../MessageDropdown/index";
import PlayButton from "../PlayButton/index";

const ProfileSongInfo = ({
  song,

  loggedInUser,
  playing,
  setIsPlaying,
  pauseSong,
  authenticated,
  setAuthenticated,
  userid,
}) => {
  // song is already the user songs NOTE
  // console.log(song);
  // console.log(song?.artist?.username);

  return (
    <>
      <div className="profile-songs-container">
        <div className="messageButtons">
          <MessageDropdown
            songsId={song.id}
            song={song}
            loggedInUser={loggedInUser}
            userid={userid}
          />
        </div>
        <div className="play-user__btn">
          {/* {console.log(song)} */}
          <PlayButton
            songsId={song.id}
            song={song}
            playing={playing}
            setIsPlaying={setIsPlaying}
            pauseSong={pauseSong}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
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
