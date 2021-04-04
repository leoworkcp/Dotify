import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSongs } from "../../store/songs";

import ProfileSongInfo from "./ProfileSongInfo";

const ProfileSongs = ({
  authenticated,
  setAuthenticated,
  userId,
  loggedInUser,
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
    dispatch(getUserSongs(userId)).then((req) => setIsLoaded(true));
  }, [dispatch, userId]);

  return (
    isLoaded && (
      <div id="profile-user__page">
        {userSongsValues.map((song, idx) => (
          <ProfileSongInfo
            song={song}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            loggedInUser={loggedInUser}
          />
        ))}
      </div>
    )
  );
};

export default ProfileSongs;
