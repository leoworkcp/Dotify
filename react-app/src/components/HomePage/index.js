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

  const publicSongs = useSelector((state) => Object.values(state?.publicSong));
  console.log(publicSongs);
  const rock = publicSongs?.filter((ele) =>
    ele?.category.toLowerCase().includes("rock")
  );

  const hop = publicSongs?.filter((ele) =>
    ele?.category.toLowerCase().includes("hip-hop")
  );
  const pop = publicSongs?.filter((ele) =>
    ele?.category.toLowerCase().includes("pop")
  );
  const jazz = publicSongs?.filter((ele) =>
    ele?.category.toLowerCase().includes("jazz")
  );
  const rnb = publicSongs?.filter((ele) =>
    ele?.category.toLowerCase().includes("r&b")
  );
  const edm = publicSongs?.filter((ele) =>
    ele?.category.toLowerCase().includes("edm")
  );
  const rap = publicSongs?.filter((ele) =>
    ele?.category.toLowerCase().includes("rap")
  );

  console.log(rock.length);
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
          {rock.length && (
            <CarouselSongs
              key="rock"
              publicSongs={rock}
              isLoaded={isLoaded}
              title={"Rock"}
              header={"All the classics"}
            />
          )}
        </div>
        <div className="music__container">
          {hop.length && (
            <CarouselSongs
              key="hip-hop"
              publicSongs={hop}
              isLoaded={isLoaded}
              title={"Hip Hop"}
              header={"Main stream vibes"}
            />
          )}
        </div>
        <div className="music__container">
          {pop.length && (
            <CarouselSongs
              key="pop"
              publicSongs={pop}
              isLoaded={isLoaded}
              title={"Pop"}
              header={"The latest and hottest pop"}
            />
          )}
        </div>
        <div className="music__container">
          {jazz.length && (
            <CarouselSongs
              key="jazz"
              publicSongs={jazz}
              isLoaded={isLoaded}
              title={"Jazz"}
              header={"The latest and hottest jazz"}
            />
          )}
        </div>
        <div className="music__container">
          {rnb.length && (
            <CarouselSongs
              key="rnb"
              publicSongs={rnb}
              isLoaded={isLoaded}
              title={"R&B"}
              header={"The latest and hottest R&B"}
            />
          )}
        </div>
        <div className="music__container">
          {edm.length && (
            <CarouselSongs
              key="edm"
              publicSongs={edm}
              isLoaded={isLoaded}
              title={"EDM"}
              header={"The latest and hottest EDM"}
            />
          )}
        </div>
        <div className="music__container">
          {rap.length && (
            <CarouselSongs
              key="rap"
              publicSongs={rap}
              isLoaded={isLoaded}
              title={"Rap"}
              header={"The latest and hottest rap"}
            />
          )}
        </div>
      </div>
    )
  );
};

export default HomePage;
