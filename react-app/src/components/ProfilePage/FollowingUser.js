import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { getAllUsers } from "../../store/users";
// import * as followActions from "../../store/follows";
import "./ProfilePage.css";

const FollowingUser = () => {
  // const { userid } = useParams();
  const [usersLoaded, setUsersLoaded] = useState(false);

  //   const user = useSelector((state) => state?.session.user);

  const followings = useSelector((state) => state?.follows.following);

  //   console.log(followings);

  useEffect(() => {
    if (followings !== undefined) setUsersLoaded(true);
  }, [followings, usersLoaded]);
  //   console.log(usersLoaded);
  return (
    usersLoaded && (
      <div className="home-main__container follows-page" key="followers-page">
        <h4>Followers</h4>
        {followings.map((artists, idx) => {
          return (
            <NavLink
              key={`follows-links-${idx}`}
              to={`/profile/${artists?.id}`}
              className="follows-link__container"
            >
              <div className="follows-div__artists" key={`follows-${idx}`}>
                <img src={artists?.profile_URL} alt="profile" />
                <p>{artists?.username}</p>
                <p>Artist</p>
              </div>
            </NavLink>
          );
        })}
      </div>
    )
  );
};

export default FollowingUser;
