import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSongs } from "../../store/songs";
import ProfileHeader from "./ProfileHeader";
import ProfileSongInfo from "./ProfileSongInfo";

const ProfileSongs = ({
  userid,
  loggedInUser,
  playing,
  setIsPlaying,
  pauseSong,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const userSongs = useSelector((state) => state.songs.user_songs);
  // const allSongs = useSelector((state) => state.songs);

  // const userSongsObject = Object.values(userSongs)

  let userSongsValues;
  isLoaded
    ? (userSongsValues = Object.values(userSongs))
    : (userSongsValues = null);

  useEffect(() => {
    dispatch(getUserSongs(userid)).then((req) => setIsLoaded(true));
  }, [dispatch, userid]);

  return (
    isLoaded && (
      <div id="profile-user__page">
        {userSongsValues.map((song, idx) => (
          <div className="container-prof" key={idx}>
            <ProfileSongInfo
              playing={playing}
              setIsPlaying={setIsPlaying}
              pauseSong={pauseSong}
              key={idx}
              song={song}
              loggedInUser={loggedInUser}
            />
          </div>
        ))}
      </div>
    )
  );
};

export default ProfileSongs;
