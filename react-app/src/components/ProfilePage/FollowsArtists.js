import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllUsers } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";

import * as followActions from "../../store/follows";
import "./ProfilePage.css";

const FollowsArtists = ({ loggedInUser }) => {
  console.log(loggedInUser);
  return (
    <div className="artist-follows__container">
      <div className="follows-div__artists">
        <img src={loggedInUser?.profile_URL} />
        <p>
          <NavLink to={`profile/${loggedInUser?.id}`}>
            {loggedInUser?.username}
          </NavLink>
          Artist
        </p>
      </div>
    </div>
  );
};

export default FollowsArtists;
