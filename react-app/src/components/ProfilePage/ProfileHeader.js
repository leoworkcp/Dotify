import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllUsers } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as followActions from "../../store/follows";
import "./ProfilePage.css";

const ProfilePage = ({ loggedInUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userid } = useParams();
  const [usersLoaded, setUsersLoaded] = useState(false);
  // const [songsClicked, setSongsClicked] = useState(true);
  // const [popularClicked, setPopularClicked] = useState(false);
  const [isTheUser, setIsTheUser] = useState(false);

  useEffect(() => {
    if (Number(userid) === loggedInUser.id) {
      setIsTheUser(true);
    } else setIsTheUser(false);
  }, [isTheUser, userid, loggedInUser]);

  function uploadButton() {
    history.push(`/profile/${loggedInUser.id}`);
  }
  function artistButton() {
    history.push(`/profile/${loggedInUser.id}/artists`);
  }

  function followersButton() {
    history.push(`/profile/${loggedInUser.id}/followers`);
  }
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
  // const [isUser, setIsUser] = useState(false);
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
    setTimeout(() => {
      setFollowsChanged(true);
    }, 100);
  };

  useEffect(() => {
    dispatch(followActions.fetchUserFollows(user?.id));
    // dispatch(playlistActions.fetchUserPlaylists(userId));
    setFollowsChanged(false);
  }, [dispatch, user.id, followsChanged]);

  // useEffect(() => {
  //   if (user?.id === artistId) setIsUser(true);
  // }, [user?.id, artistId, isUser]);
  // console.log(isUser);

  // follows new ends
  useEffect(() => {
    dispatch(getAllUsers()).then((req) => setUsersLoaded(true));
  }, [dispatch]);
  const allUsers = useSelector((state) => Object.values(state?.users));

  // console.log(isTheUser);
  return (
    usersLoaded && (
      <div key={loggedInUser?.id}>
        {allUsers.map((song, idx) => {
          if (Number(userid) === song.id) {
            return (
              <div className="profile-header__container" key={idx}>
                {isTheUser && (
                  <div className="user-menu__container">
                    <button onClick={uploadButton}>Uploaded</button>
                    <button onClick={artistButton}>Artists</button>
                    <button onClick={followersButton}>Followers</button>
                  </div>
                )}
                <div className="profile-username">
                  <img src={song.profile_URL} alt="profile" />

                  {isFollowed && !isTheUser && (
                    <div className="follow">
                      <button onClick={(e) => offFollow(e, artistId)}>
                        unFollow
                      </button>
                    </div>
                  )}
                  {!isFollowed && !isTheUser && (
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
          } else return <div key={idx}></div>;
        })}
      </div>
    )
  );
};

export default ProfilePage;
