import React from "react";
// import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import { findPublicSongs } from "./../../store/userInfo";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MessageDropdown from "../MessageDropdown/index";
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
  const loggedInUser = useSelector((state) => state?.session.user);
  const userid = loggedInUser?.id;
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
                    <div className="title-dropBtn__container">
                      <NavLink to={`song/${publicSong?.id}`}>
                        <p className="legend">{publicSong?.name}</p>
                      </NavLink>
                      <NavLink to={`profile/${publicSong?.artist_id}`}>
                        <p className="legend username">
                          {publicSong?.artist?.username}
                        </p>
                      </NavLink>
                      <div className="legend">
                        <MessageDropdown
                          songsId={publicSong.id}
                          song={publicSong}
                          loggedInUser={loggedInUser}
                          userid={userid}
                        />
                      </div>
                    </div>
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
