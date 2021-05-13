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
  console.log(userId, typeof userId);
  const [followsChanged, setFollowsChanged] = useState(false);
  const user = useSelector((state) => state?.session.user);
  const follows = useSelector((state) => state?.follows);
  const followings = useSelector((state) => state?.follows.followers);
  console.log(followings);
  console.log(follows);
  const isFollowed = followings?.find((following) => following.id === artistId);

  const onFollow = (e, artistId) => {
    e.stopPropagation();
    dispatch(followActions.addFollow(userId, artistId));
    setTimeout(() => {
      setFollowsChanged(true);
    }, 100);
  };

  const offFollow = (e, artistId) => {
    e.stopPropagation();
    dispatch(followActions.removeFollow(userId, artistId));
  };

  useEffect(() => {
    dispatch(followActions.fetchUserFollows(userId));
    // dispatch(playlistActions.fetchUserPlaylists(userId));
    setFollowsChanged(false);
  }, [dispatch, userId, followsChanged]);

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
                <div className="profile-username">
                  <img src={song.profile_URL} alt="profile" />
                  {isFollowed ? (
                    <div
                      className="follow"
                      onClick={(e) => offFollow(e, userId)}
                    >
                      unFollow
                    </div>
                  ) : (
                    <div
                      className="follow"
                      onClick={(e) => onFollow(e, userId)}
                    >
                      + Follow
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
