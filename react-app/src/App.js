import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";

// import { ThemeProvider } from "@material-ui/styles";
// new auth to test
// import { authenticate } from "./store/auth";
import ProtectedRoute from "./components/auth/ProtectedRoute/index";
import * as sessionActions from "./store/session";

// components
import LikedSongs from "./components/LikedSongs/index";
import NavBar from "./components/NavBar/index";
import Sidebar from "./components/Sidebar/index";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import Player from "./components/AudioPlayer";
import ProfileHeader from "./components/ProfilePage/ProfileHeader";
import SongPage from "./components/SongPage/index";
import SearchBar from "./components/SearchBar/index";
import { findPublicSongs } from "./store/publicSongs";
export default function App() {
  const dispatch = useDispatch();

  const [seek, setSeek] = useState(0.0);
  const wavesurfer = useRef(null);
  const [drag, setDrag] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setIsPlaying] = useState(false);
  const [mute, setMute] = useState(false);

  const currentSong = useSelector((state) => state.playing);
  // console.log(currentSong);
  // public songs
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(async () => {
    await dispatch(findPublicSongs()).then((req) => setIsLoaded(true));
  }, [dispatch]);

  const publicSongs = useSelector((state) => Object.values(state?.publicSong));

  // custom drag for audi0player
  function draggable() {
    if (drag === true) {
      return (
        <Draggable>
          <div className="box">
            <div className="drag-container">
              <button onClick={() => setDrag(false)}>X</button>
              <div className="shadow">X</div>
              <img src={currentSong?.image_url} alt="drag-cover" />
            </div>
          </div>
        </Draggable>
      );
    } else return;
  }

  // user frontend auth
  useEffect(async () => {
    const user = await dispatch(sessionActions.restoreUser());
    if (!user.errors) {
      setAuthenticated(true);
    }
    setLoaded(true);
  }, [dispatch]);

  const pauseSong = async () => {
    await setIsPlaying(false);
  };

  const loggedInUser = useSelector((state) => state?.session.user);
  const userid = loggedInUser?.id;

  if (!loaded) {
    return null;
  }

  // console.log(playing);
  // console.log(mute);

  return (
    isLoaded && (
      // <ThemeProvider>
      <BrowserRouter>
        {/* <div id="waveform" /> */}
        <NavBar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          loggedInUser={loggedInUser}
          playing={playing}
          setIsPlaying={setIsPlaying}
          pauseSong={pauseSong}
        />
        <div className="mainContent">
          <Sidebar
            userid={userid}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
          <Route path="/" exact={true}>
            <HomePage
              setIsLoaded={setIsLoaded}
              isLoaded={isLoaded}
              publicSongs={publicSongs}
              playing={playing}
              setIsPlaying={setIsPlaying}
              pauseSong={pauseSong}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <Switch>
            <ProtectedRoute
              path="/users"
              exact={true}
              authenticated={authenticated}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/users/:userid"
              exact={true}
              authenticated={authenticated}
            ></ProtectedRoute>
            <Route path={"/profile/:userid"} exact={true}>
              <ProfileHeader publicSongs={publicSongs} />
              <ProfilePage
                loggedInUser={loggedInUser}
                playing={playing}
                setIsPlaying={setIsPlaying}
                pauseSong={pauseSong}
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            </Route>
            <Route path={"/song/:songId"} exact={true}>
              <SongPage
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                publicSongs={publicSongs}
                loaded={loaded}
                playing={playing}
                setIsPlaying={setIsPlaying}
                pauseSong={pauseSong}
                mute={mute}
                setMute={setMute}
                seek={seek}
                setSeek={setSeek}
                wavesurfer={wavesurfer}
                currentSong={currentSong}
              />
            </Route>

            <Route path={"/search"} exact={true}>
              <SearchBar
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            </Route>
            <Route path={"/collection/tracks/:userid"} exact={true}>
              <LikedSongs
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                publicSongs={publicSongs}
                loggedInUser={loggedInUser}
                userid={userid}
              />
            </Route>
          </Switch>
        </div>
        {draggable()}
        <Route path={["/song/:songId", "/profile/:userid", "/", "/search"]}>
          <Player
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            seek={seek}
            setSeek={setSeek}
            mute={mute}
            setMute={setMute}
            loggedInUser={loggedInUser}
            publicSongs={publicSongs}
            currentSong={currentSong}
            drag={drag}
            setDrag={setDrag}
            userid={userid}
            playing={playing}
            setIsPlaying={setIsPlaying}
            pauseSong={pauseSong}
            wavesurfer={wavesurfer}
            userid={userid}
          />
        </Route>
      </BrowserRouter>

      // </ThemeProvider>
    )
  );
}
