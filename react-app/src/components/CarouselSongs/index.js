import React from "react";
// import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import { findPublicSongs } from "./../../store/userInfo";
// import { useDispatch } from "react-redux";
import "./Carousel.css";
import { NavLink } from "react-router-dom";
import PlayButton from "../PlayButton/index";
const CarouselSongs = ({
  publicSongs,
  isLoaded,
  title,
  header,
  playing,
  setIsPlaying,
  pauseSong,
  authenticated,
  setAuthenticated,
}) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (isLoaded) dispatch(findPublicSongs());
  // }, [isLoaded]);
  // console.log(publicSongs);
  return (
    isLoaded && (
      <div className="carousel-main_container">
        <div className="carousel-header">
          <div className="carousel-title">
            <h1>{title}</h1>
            <h3>{header}</h3>
          </div>
        </div>
        <div className="carouser-main">
          <Carousel key={title}>
            {publicSongs.map((publicSong, idx) => {
              return (
                <div key={idx} className="img-controller">
                  <PlayButton
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                    pauseSong={pauseSong}
                    publicSong={publicSong}
                    playing={playing}
                    setIsPlaying={setIsPlaying}
                  />
                  {authenticated && (
                    <NavLink to={`song/${publicSong?.id}`}>
                      <p className="legend">{publicSong?.name}</p>
                    </NavLink>
                  )}
                  {!authenticated && (
                    <p className="legend">{publicSong?.name}</p>
                  )}
                  <img src={publicSong?.image_url} alt="profile-song"></img>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    )
  );
};

export default CarouselSongs;
