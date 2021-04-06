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

  // const artist = useSelector((state) => state.users.username);
  // useEffect(() => {
  //   // if (sessionUser.user) setIsLoaded(true);
  //   dispatch(getArtist(userid)).then(() => setIsLoaded(true));
  // }, [dispatch, userid]);

  return (
    <>
      <div className="home-main__container">
        <div className="profile-page-contents">
          <div id="profile-songs-div">
            {/* {songsClicked ? <ProfileSongs /> : ""} */}
            <ProfileSongs
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              userid={userid}
              loggedInUser={loggedInUser}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
