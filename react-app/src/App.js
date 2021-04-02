import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// new auth to test
import { ThemeProvider } from "@material-ui/styles";
import { authenticate } from "./store/auth";
import ProtectedRoute from "./components/auth/ProtectedRoute/index";
import * as sessionActions from "./store/session";
// components
import NavBar from "./components/NavBar/index";
import Sidebar from "./components/Sidebar/index";

import CommentForm from "./components/CommentForm/CommentForm";
import ProfilePage from "./components/ProfilePage";
// for later to work
import Waveform from "./components/MediaPlayer/Waveform.js";

import { getAllSongs } from "./store/songs";

export default function App() {
  const dispatch = useDispatch();

  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [songsLoaded, setSongsLoaded] = useState(false);

  useEffect(async () => {
    const user = await dispatch(sessionActions.restoreUser());
    if (!user.errors) {
      setAuthenticated(true);
    }
    setLoaded(true);
  }, [dispatch]);

  const songs = useSelector((state) => Object.values(state.songs));

  useEffect(() => {
    if (songs) {
      dispatch(getAllSongs()).then((req) => setSongsLoaded(true));
    }
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    songsLoaded && (
      <ThemeProvider>
        <BrowserRouter>
          <NavBar
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
          <div className="mainContent">
            <Sidebar
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
            {/* new stuff */}
            <Route
              path="/test"
              exact={true}
              authenticated={authenticated}
            ></Route>

            <Switch>
              <ProtectedRoute
                path="/users"
                exact={true}
                authenticated={authenticated}
              ></ProtectedRoute>
              <ProtectedRoute
                path="/users/:userId"
                exact={true}
                authenticated={authenticated}
              ></ProtectedRoute>
              <Route path={"/profile/:userId"} exact={true}>
                <ProfilePage
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                />
              </Route>
              <Route path="/" exact={true} authenticated={authenticated}>
                {/* home will go here */}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    )
  );
}
