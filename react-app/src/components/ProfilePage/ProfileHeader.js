import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllUsers } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";

import * as followActions from "../../store/follows";
import "./ProfilePage.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [usersLoaded, setUsersLoaded] = useState(false);
  // const [songsClicked, setSongsClicked] = useState(true);
  // const [popularClicked, setPopularClicked] = useState(false);

  // const displaySongs = () => {
  //   setSongsClicked(true);
  //   setPopularClicked(false);
  // };
  // const displayPopular = () => {
  //   setSongsClicked(false);
  //   setPopularClicked(true);
  // };

  // follows new
  let artistId = Number(userid);
  // console.log(artistId, typeof artistId);
  const [followsChanged, setFollowsChanged] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const user = useSelector((state) => state?.session.user);
  // const follows = useSelector((state) => state?.follows);
  const followings = useSelector((state) => state?.follows.followers);
  // console.log(followings);
  // console.log(follows);
  const isFollowed = followings?.find((following) => following.id === artistId);
  // console.log(user?.id);
  const onFollow = (e, artistId) => {
    // e.stopPropagation();
    e.preventDefault();
    dispatch(followActions.addFollow(user?.id, artistId));
    setTimeout(() => {
      setFollowsChanged(true);
    }, 100);
  };

  const offFollow = (e, artistId) => {
    // e.stopPropagation();
    e.preventDefault();
    dispatch(followActions.removeFollow(user?.id, artistId));
  };

  useEffect(() => {
    dispatch(followActions.fetchUserFollows(user?.id));
    // dispatch(playlistActions.fetchUserPlaylists(userId));
    setFollowsChanged(false);
  }, [dispatch, user?.id, followsChanged]);

  useEffect(() => {
    if (user?.id === artistId) setIsUser(true);
  }, [user?.id, artistId, isUser]);

  // console.log(isUser);
  // follows new ends
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
                {isUser && (
                  <div className="user-menu__container">
                    <button>Uploaded</button>
                    <button>Artists</button>
                  </div>
                )}
                <div className="profile-username">
                  <img src={song.profile_URL} alt="profile" />

                  {isFollowed && !isUser && (
                    <div className="follow">
                      <button onClick={(e) => offFollow(e, artistId)}>
                        unFollow
                      </button>
                    </div>
                  )}
                  {!isFollowed && !isUser && (
                    <div className="follow">
                      <button onClick={(e) => onFollow(e, artistId)}>
                        + Follow
                      </button>
                    </div>
                  )}
                  <h1>{song?.username}</h1>
                </div>
              </div>
            );
          } else return <></>;
        })}
      </>
    )
  );
};

export default ProfilePage;
