import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSongs } from "../../store/songs";
import { useParams } from "react-router-dom";
import ProfileSongInfo from "./ProfileSongInfo";

const ProfileSongs = () => {
  const { userId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const userSongs = useSelector((state) => state.songs.user_songs);
  // const allSongs = useSelector((state) => state.songs);

  // const userSongsObject = Object.values(userSongs)

  // console.log("all songs:", allSongs)
  // if(userSongs) console.log("user songs", Object.values(userSongs))
  let userSongsValues;
  isLoaded
    ? (userSongsValues = Object.values(userSongs))
    : (userSongsValues = null);

  // console.log("user Id", userId);
  useEffect(() => {
    dispatch(getUserSongs(userId)).then((req) => setIsLoaded(true));
    // dispatch(getAllSongs())
  }, [dispatch, userId]);

  return (
    isLoaded && (
      <div id="profile-user__page">
        {userSongsValues.map((song, idx) => (
          <ProfileSongInfo song={song} />
        ))}
      </div>
    )
  );
};

export default ProfileSongs;
