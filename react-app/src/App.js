import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";
import { ThemeProvider } from "@material-ui/styles";
// new auth to test
// import { authenticate } from "./store/auth";
import ProtectedRoute from "./components/auth/ProtectedRoute/index";
import * as sessionActions from "./store/session";
// components
import NavBar from "./components/NavBar/index";
import Sidebar from "./components/Sidebar/index";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import Player from "./components/AudioPlayer";
import ProfileHeader from "./components/ProfilePage/ProfileHeader";
import SongPage from "./components/SongPage/index";
import { findPublicSongs } from "./store/publicSongs";
export default function App() {
  const dispatch = useDispatch();
  // draggable

  const [drag, setDrag] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setIsPlaying] = useState(false);

  const currentSong = useSelector((state) => state.playing);

  // public songs
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(findPublicSongs()).then((req) => setIsLoaded(true));
  }, [dispatch]);

  const publicSongs = useSelector((state) => Object.values(state?.publicSong));

  // draggable function
  //   const [position, setPosition] = useState({ x: 0, y: 0 });
  // const trackPos = (data) => {
  //   setPosition({ x: data.x, y: data.y });
  // };

  function draggable() {
    // <Draggable onDrag={(e, data) => trackPos(data)}>
    //   <div className="box">
    //     <div>Here's my position...</div>
    //     <div>
    //       x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
    //     </div>
    //   </div>
    // </Draggable>
    // <Draggable handle="#handle">
    //   <div className="box">
    //     <span id="handle">Drag here</span>
    //     <div style={{ padding: "1em" }}>Cannot drag here</div>
    //   </div>
    // </Draggable>
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

  return (
    <ThemeProvider>
      <BrowserRouter>
        <NavBar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          loggedInUser={loggedInUser}
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
              <ProfileHeader userid={userid} loggedInUser={loggedInUser} />
              <ProfilePage
                loggedInUser={loggedInUser}
                playing={playing}
                setIsPlaying={setIsPlaying}
                pauseSong={pauseSong}
              />
            </Route>
            <Route path={"/song/:songId"} exact={true}>
              <SongPage
                publicSongs={publicSongs}
                loggedInUser={loggedInUser}
                playing={playing}
                setIsPlaying={setIsPlaying}
                pauseSong={pauseSong}
              />
            </Route>
          </Switch>
        </div>
        {draggable()}
        <Player
          publicSongs={publicSongs}
          currentSong={currentSong}
          drag={drag}
          setDrag={setDrag}
          loggedInUser={loggedInUser}
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          playing={playing}
          setIsPlaying={setIsPlaying}
          pauseSong={pauseSong}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}
