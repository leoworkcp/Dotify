import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// import { getArtist } from "../../store/users";
import "./ProfilePage.css";

const ProfilePage = ({
  authenticated,
  setAuthenticated,
  loggedInUser,
  userid,
}) => {
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

  return (
    <div className="profile-header__container">
      <div className="profile-header">
        <img src={loggedInUser?.profile_URL} alt="profile" />
      </div>
      <div className="profile-username">
        <h1>{loggedInUser?.username}</h1>
      </div>
    </div>
  );
};

export default ProfilePage;
