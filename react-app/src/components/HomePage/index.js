import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { findPublicSongs } from "../../store/publicSongs";

import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(findPublicSongs()).then((req) => setIsLoaded(true));
  }, [dispatch]);

  const publicSongs = useSelector((state) => state?.publicSong);
  console.log(publicSongs);
  return (
    isLoaded && (
      <div className="home-main__container">
        <div className="public-music__container">
          <h1>Public Music</h1>
          <h3>The latest and hottest</h3>
          <div className="public-music__container">
            {publicSongs.map((publicSong) => {
              return (
                <div className="song-container" id={publicSong.id}>
                  <div className="son-div__container"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default HomePage;
