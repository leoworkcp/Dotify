// import React from "react";
import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileSongs from "./ProfileSongs";
// import { getArtist } from "../../store/users";
import "./ProfilePage.css";

const ProfilePage = ({
  loggedInUser,
  playing,
  setIsPlaying,
  pauseSong,
  authenticated,
  setAuthenticated,
}) => {
  const { userid } = useParams();

  // const dispatch = useDispatch();
  const [isUser, setIsUser] = useState(false);
  // const artist = useSelector((state) => state.users.username);
  // useEffect(() => {
  //   // if (sessionUser.user) setIsLoaded(true);
  //   dispatch(getArtist(userid)).then(() => setIsLoaded(true));
  // }, [dispatch, userid]);
  useEffect(() => {
    if (Number(userid) === loggedInUser.id) setIsUser(true);
  }, [isUser, userid, loggedInUser]);

  // console.log(isUser);
  return (
    <>
      <div className="home-main__container">
        {isUser && <h4>Uploaded</h4>}
        <div className="profile-page-contents">
          <div id="profile-songs-div">
            {/* {songsClicked ? <ProfileSongs /> : ""} */}
            <ProfileSongs
              playing={playing}
              setIsPlaying={setIsPlaying}
              pauseSong={pauseSong}
              userid={userid}
              loggedInUser={loggedInUser}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
