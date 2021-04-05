import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// new auth to test
import { ThemeProvider } from "@material-ui/styles";
// import { authenticate } from "./store/auth";
import ProtectedRoute from "./components/auth/ProtectedRoute/index";
import * as sessionActions from "./store/session";
// components
import NavBar from "./components/NavBar/index";
import Sidebar from "./components/Sidebar/index";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import Player from "./components/AudioPlayer";
// for later to work
// import Waveform from "./components/MediaPlayer/Waveform.js";

export default function App() {
  const dispatch = useDispatch();

  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setIsPlaying] = useState(false);
  useEffect(async () => {
    const user = await dispatch(sessionActions.restoreUser());
    if (!user.errors) {
      setAuthenticated(true);
    }
    setLoaded(true);
  }, [dispatch]);

  const pauseSong = (e) => {
    e.preventDefault();
    setIsPlaying(false);
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
              <ProfilePage
                loggedInUser={loggedInUser}
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            </Route>
          </Switch>
        </div>
        <Player
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
