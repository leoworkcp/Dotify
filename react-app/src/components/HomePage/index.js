import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { findPublicSongs } from "../../store/publicSongs";
import CarouselSongs from "../CarouselSongs/index";
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
        <div className="music__container">
          <CarouselSongs
            key="public"
            publicSongs={publicSongs}
            isLoaded={isLoaded}
            title={"Public Songs"}
            header={"The latest and hottest"}
          />
        </div>
        <div className="music__container">
          <CarouselSongs
            key="rock"
            publicSongs={publicSongs}
            isLoaded={isLoaded}
            title={"Rock"}
            header={"All the classics"}
          />
        </div>
        <div className="music__container">
          <CarouselSongs
            key="hip-hop"
            publicSongs={publicSongs}
            isLoaded={isLoaded}
            title={"Hip Hop"}
            header={"Main stream vibes"}
          />
        </div>
        <div className="music__container">
          <CarouselSongs
            key="pop"
            publicSongs={publicSongs}
            isLoaded={isLoaded}
            title={"Pop"}
            header={"The latest and hottest pop"}
          />
        </div>
        <div className="music__container">
          <CarouselSongs
            key="jazz"
            publicSongs={publicSongs}
            isLoaded={isLoaded}
            title={"Jazz"}
            header={"The latest and hottest jazz"}
          />
        </div>
        <div className="music__container">
          <CarouselSongs
            key="rnb"
            publicSongs={publicSongs}
            isLoaded={isLoaded}
            title={"R&B"}
            header={"The latest and hottest R&B"}
          />
        </div>
        <div className="music__container">
          <CarouselSongs
            key="edm"
            publicSongs={publicSongs}
            isLoaded={isLoaded}
            title={"EDM"}
            header={"The latest and hottest EDM"}
          />
        </div>
        <div className="music__container">
          <CarouselSongs
            key="rap"
            publicSongs={publicSongs}
            isLoaded={isLoaded}
            title={"Rap"}
            header={"The latest and hottest rap"}
          />
        </div>
      </div>
    )
  );
};

export default HomePage;
