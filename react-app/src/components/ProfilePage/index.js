import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileSongs from "./ProfileSongs";
// import { getArtist } from "../../store/users";
import "./ProfilePage.css";

const ProfilePage = ({ authenticated, setAuthenticated, loggedInUser }) => {
  const { userid } = useParams();
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [songsClicked, setSongsClicked] = useState(true);
  const [popularClicked, setPopularClicked] = useState(false);
  // const artist = useSelector((state) => state.users.username);
  // useEffect(() => {
  //   // if (sessionUser.user) setIsLoaded(true);
  //   dispatch(getArtist(userid)).then(() => setIsLoaded(true));
  // }, [dispatch, userid]);

  const displaySongs = () => {
    setSongsClicked(true);
    setPopularClicked(false);
  };
  const displayPopular = () => {
    setSongsClicked(false);
    setPopularClicked(true);
  };

  return (
    <div className="home-main__container">
      <div id="profile-page-contents">
        {/* <div id="profile-header">
            <img
              id="profile-image"
              src="https://i.stack.imgur.com/l60Hf.png"
              alt="profile"
            />
            <h1 id="profile-username">{artist.username}</h1>
          </div>
          <nav id="profile-nav">
            <button
              className="profile-nav-link no-outline"
              onClick={displaySongs}
            >
              Songs
            </button>
            <button
              className="profile-nav-link no-outline"
              onClick={displayPopular}
            >
              Popular
            </button>
          </nav> */}
        <div id="profile-display">
          <div id="profile-songs-div">
            {/* {songsClicked ? <ProfileSongs /> : ""} */}
            <ProfileSongs
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              userid={userid}
              loggedInUser={loggedInUser}
            />
          </div>
          <div id="profile-popular-div">
            {popularClicked ? <h1>Popular</h1> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
