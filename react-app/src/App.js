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
import * as sessionActions from "./store/session";
// old user auth
// import LoginForm from "./components/auth/LoginForm";
// import SignUpForm from "./components/auth/SignUpForm";
// import NavBar from "./components/NavBar";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from "./components/UsersList";
// import User from "./components/User";
// import { authenticate } from "./services/auth";

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
        {/* old stuff */}
        {/* <Switch>
          <Route path="/login" exact={true}>
            <LoginForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <ProtectedRoute
            path="/users"
            exact={true}
            authenticated={authenticated}
          >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute
            path="/users/:userId"
            exact={true}
            authenticated={authenticated}
          >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
            <h1>My Home Page</h1>
          </ProtectedRoute>
        </Switch> */}
      </BrowserRouter>
    </ThemeProvider>
  );
}
