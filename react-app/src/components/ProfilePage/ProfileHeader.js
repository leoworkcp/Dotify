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

  console.log(loggedInUser);
  console.log(loggedInUser?.profile_URL);
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
      {/* <nav id="profile-nav">
        <button
          className="profile-nav-link no-outline"
          onClick={displaySongs}
        ></button>
        <button
          className="profile-nav-link no-outline"
          onClick={displayPopular}
        >
          Popular
        </button>
      </nav>
      <div id="profile-popular-div">
        {popularClicked ? <h1>Popular</h1> : ""}
      </div> */}
    </div>
  );
};

export default ProfilePage;
