import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllUsers } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";

import "./ProfilePage.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [songsClicked, setSongsClicked] = useState(true);
  const [popularClicked, setPopularClicked] = useState(false);

  const displaySongs = () => {
    setSongsClicked(true);
    setPopularClicked(false);
  };
  const displayPopular = () => {
    setSongsClicked(false);
    setPopularClicked(true);
  };

  useEffect(() => {
    dispatch(getAllUsers()).then((req) => setUsersLoaded(true));
  }, [dispatch]);
  const allUsers = useSelector((state) => Object.values(state?.users));

  return (
    usersLoaded && (
      <>
        {allUsers.map((song, idx) => {
          if (Number(userid) === song.id) {
            return (
              <div className="profile-header__container" key={idx}>
                <div className="profile-header">
                  <img src={song.profile_URL} alt="profile" />
                </div>
                <div className="profile-username">
                  <h1>{song?.username}</h1>
                </div>
              </div>
            );
          }
        })}
      </>
    )
  );
};

export default ProfilePage;
