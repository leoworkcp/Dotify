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
        {rock.length && (
          <div className="music__container">
            <CarouselSongs
              key="rock"
              publicSongs={rock}
              isLoaded={isLoaded}
              title={"Rock"}
              header={"All the classics"}
            />
          </div>
        )}
        {hop.length && (
          <div className="music__container">
            <CarouselSongs
              key="hip-hop"
              publicSongs={hop}
              isLoaded={isLoaded}
              title={"Hip Hop"}
              header={"Main stream vibes"}
            />
          </div>
        )}
        {pop.length && (
          <div className="music__container">
            <CarouselSongs
              key="pop"
              publicSongs={pop}
              isLoaded={isLoaded}
              title={"Pop"}
              header={"The latest and hottest pop"}
            />
          </div>
        )}
        {jazz.length && (
          <div className="music__container">
            <CarouselSongs
              key="jazz"
              publicSongs={jazz}
              isLoaded={isLoaded}
              title={"Jazz"}
              header={"The latest and hottest jazz"}
            />
          </div>
        )}
        {rnb.length && (
          <div className="music__container">
            <CarouselSongs
              key="rnb"
              publicSongs={rnb}
              isLoaded={isLoaded}
              title={"R&B"}
              header={"The latest and hottest R&B"}
            />
          </div>
        )}
        {edm.length && (
          <div className="music__container">
            <CarouselSongs
              key="edm"
              publicSongs={edm}
              isLoaded={isLoaded}
              title={"EDM"}
              header={"The latest and hottest EDM"}
            />
          </div>
        )}
        {rap.length && (
          <div className="music__container">
            <CarouselSongs
              key="rap"
              publicSongs={rap}
              isLoaded={isLoaded}
              title={"Rap"}
              header={"The latest and hottest rap"}
            />
          </div>
        )}
      </div>
    )
  );
};

export default HomePage;
