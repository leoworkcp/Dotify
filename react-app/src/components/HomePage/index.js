import React from "react";

// import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import { findPublicSongs } from "../../store/publicSongs";
import CarouselSongs from "../CarouselSongs/index";
import "./HomePage.css";

const HomePage = ({
  playing,
  setIsPlaying,
  pauseSong,
  publicSongs,
  isLoaded,
  setIsLoaded,
  authenticated,
  setAuthenticated,
}) => {
  // const dispatch = useDispatch();

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
  const [checkRock, setCheckRock] = useState(false);
  useEffect(() => {
    if (rock.length) setCheckRock(true);
  }, [rock.length]);
  const [checkHop, setCheckHop] = useState(false);
  useEffect(() => {
    if (hop.length) setCheckHop(true);
  }, [hop.length]);
  const [checkPop, setCheckPop] = useState(false);
  useEffect(() => {
    if (pop.length) setCheckPop(true);
  }, [pop.length]);
  const [checkJazz, setCheckJazz] = useState(false);
  useEffect(() => {
    if (jazz.length) setCheckJazz(true);
  }, [jazz.length]);

  const [checkRnb, setCheckRnb] = useState(false);
  useEffect(() => {
    if (rnb.length) setCheckRnb(true);
  }, [rnb.length]);
  const [checkEdm, setCheckEdm] = useState(false);
  useEffect(() => {
    if (edm.length) setCheckEdm(true);
  }, [edm.length]);
  const [checkRap, setCheckRap] = useState(false);
  useEffect(() => {
    if (rap.length) setCheckRap(true);
  }, [rap.length]);

  return (
    isLoaded && (
      <div className="home-main__container_home">
        <div className="music__container">
          <CarouselSongs
            pauseSong={pauseSong}
            playing={playing}
            setIsPlaying={setIsPlaying}
            key="public"
            publicSongs={publicSongs}
            isLoaded={isLoaded}
            title={"Public Songs"}
            header={"The latest and hottest"}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </div>
        {checkRock && (
          <div className="music__container">
            <CarouselSongs
              pauseSong={pauseSong}
              playing={playing}
              setIsPlaying={setIsPlaying}
              key="rock"
              publicSongs={rock}
              isLoaded={isLoaded}
              title={"Rock"}
              header={"All the classics"}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </div>
        )}
        {checkHop && (
          <div className="music__container">
            <CarouselSongs
              pauseSong={pauseSong}
              playing={playing}
              setIsPlaying={setIsPlaying}
              key="hip-hop"
              publicSongs={hop}
              isLoaded={isLoaded}
              title={"Hip Hop"}
              header={"Main stream vibes"}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </div>
        )}
        {checkPop && (
          <div className="music__container">
            <CarouselSongs
              pauseSong={pauseSong}
              playing={playing}
              setIsPlaying={setIsPlaying}
              key="pop"
              publicSongs={pop}
              isLoaded={isLoaded}
              title={"Pop"}
              header={"The latest and hottest pop"}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </div>
        )}
        {checkJazz && (
          <div className="music__container">
            <CarouselSongs
              pauseSong={pauseSong}
              playing={playing}
              setIsPlaying={setIsPlaying}
              key="jazz"
              publicSongs={jazz}
              isLoaded={isLoaded}
              title={"Jazz"}
              header={"The latest and hottest jazz"}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </div>
        )}
        {checkRnb && (
          <div className="music__container">
            <CarouselSongs
              pauseSong={pauseSong}
              playing={playing}
              setIsPlaying={setIsPlaying}
              key="rnb"
              publicSongs={rnb}
              isLoaded={isLoaded}
              title={"R&B"}
              header={"The latest and hottest R&B"}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </div>
        )}
        {checkEdm && (
          <div className="music__container">
            <CarouselSongs
              pauseSong={pauseSong}
              playing={playing}
              setIsPlaying={setIsPlaying}
              key="edm"
              publicSongs={edm}
              isLoaded={isLoaded}
              title={"EDM"}
              header={"The latest and hottest EDM"}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </div>
        )}
        {checkRap && (
          <div className="music__container">
            <CarouselSongs
              pauseSong={pauseSong}
              playing={playing}
              setIsPlaying={setIsPlaying}
              key="rap"
              publicSongs={rap}
              isLoaded={isLoaded}
              title={"Rap"}
              header={"The latest and hottest rap"}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </div>
        )}
      </div>
    )
  );
};

export default HomePage;
