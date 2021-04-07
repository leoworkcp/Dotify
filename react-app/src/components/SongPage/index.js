import React, { useEffect, useState } from "react";
import "./SongPage.css";
import banner1 from "./banner1.jpg";
import { useParams } from "react-router";
import { getAllUsers } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
function SongPage({ publicSongs, loggedInUser }) {
  const { songId } = useParams();
  //   console.log(typeof songId);
  // console.log(publicSongs);
  // users
  const [usersLoaded, setUsersLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers()).then((req) => setUsersLoaded(true));
  }, [dispatch]);
  const allUsers = useSelector((state) => state?.users);

  // allUsers.map((user) => {});

  return (
    <>
      {publicSongs.map((song, idx) => {
        if (Number(songId) === song.id) {
          return (
            <div className="song_page" key={idx}>
              <img src={banner1} alt="banner" />
              <div className="profile-username">
                <h1>{loggedInUser?.username}</h1>
              </div>
              <div className="cover-div">
                <img src={song.image_url} alt="song-cover" />
              </div>
              <div className="song-page__title">
                <h1>{song.name}</h1>
                <h2>{song.category}</h2>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}

export default SongPage;
