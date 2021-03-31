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
import NavBar from "./components/NavBar/index";
import Sidebar from "./components/Sidebar/index";
import * as sessionActions from "./store/session";

export default function App() {
  const dispatch = useDispatch();

  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    const user = await authenticate();
    if (!user.errors) {
      dispatch(sessionActions.restoreUser());
      setAuthenticated(true);
    }
    setLoaded(true);
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <NavBar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
        <Sidebar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        ></Sidebar>
        {/* new stuff */}
        <div className="mainContent">
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
            <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
              {/* home will go here */}
            </ProtectedRoute>
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
