import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";

const CarouselSongs = ({ publicSongs, isLoaded, title, header }) => {
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
                <div key={idx}>
                  <img src={publicSong?.image_url}></img>
                  <p className="legend">{publicSong?.name}</p>
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
