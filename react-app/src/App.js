import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
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
import FollowsArtists from "./components/ProfilePage/FollowsArtists";
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
  const handle = useFullScreenHandle();
  const publicSongs = useSelector((state) => Object.values(state?.publicSong));

  const loggedInUser = useSelector((state) => state?.session.user);
  const userid = loggedInUser?.id;
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

  const pauseSong = async () => {
    await setIsPlaying(false);
  };

  // user frontend auth
  useEffect(() => {
    async function user() {
      const user = await dispatch(sessionActions.restoreUser());
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    }

    user();
  }, [dispatch]);

  // if (!loaded) {
  //   return null;
  // }

  // console.log(playing);
  // console.log(mute);

  useEffect(() => {
    async function find() {
      await dispatch(findPublicSongs()).then((req) => setIsLoaded(true));
    }
    find();
  }, [dispatch]);

  return (
    isLoaded && (
      <BrowserRouter>
        <FullScreen handle={handle}>
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
              <Route path={["/profile/:userid/artists", "/profile/:userid"]}>
                <ProfileHeader
                  publicSongs={publicSongs}
                  loggedInUser={loggedInUser}
                />

                <Route path={"/profile/:userid"} exact={true}>
                  <ProfilePage
                    loggedInUser={loggedInUser}
                    playing={playing}
                    setIsPlaying={setIsPlaying}
                    pauseSong={pauseSong}
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                  />
                </Route>
                <Route path={"/profile/:userid/artists"} exact={true}>
                  <FollowsArtists
                    loggedInUser={loggedInUser}
                    playing={playing}
                    setIsPlaying={setIsPlaying}
                    pauseSong={pauseSong}
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                  />
                </Route>
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
                  playing={playing}
                  setIsPlaying={setIsPlaying}
                  pauseSong={pauseSong}
                />
              </Route>
            </Switch>
          </div>
          {draggable()}

          <Route path={["/song/:songId", "/profile/:userid", "/", "/search"]}>
            <Player
              handle={handle}
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
            />
          </Route>
        </FullScreen>
      </BrowserRouter>
    )
  );
}
