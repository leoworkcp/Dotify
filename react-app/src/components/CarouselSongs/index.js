import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
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
                  <NavLink to={`song/${publicSong?.id}`}>
                    <p className="legend">{publicSong?.name}</p>
                  </NavLink>
                  <img src={publicSong?.image_url}></img>
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
