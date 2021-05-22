import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import { fetchUserSongs } from "../../../store/userInfo";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

const LoginForm = ({
  authenticated,
  setAuthenticated,
  setIsOpenLogin,
  openModalSignUp,
  closeModalLogin,
}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onSignUp = (e) => {
    e.preventDefault();
    closeModalLogin();
    openModalSignUp();
  };

  const onLogin = async (e) => {
    e.preventDefault();

    const user = await dispatch(sessionActions.login({ email, password }));

    if (!user.payload.errors) {
      setIsOpenLogin(false);
      setAuthenticated(true);
      // dispatch(fetchUserSongs(user.payload.id));
      return history.push("/");
    } else {
      setErrors(user.payload.errors);
    }
  };

  const email1 = "demo@aa.io";
  const password1 = "password";

  const email2 = "brunno_mars@gmail.com";
  const password2 = "Demouser123";

  const demoUser1 = (e) => {
    setEmail(email2);
    setPassword(password2);
    dispatch(sessionActions.login({ email: email2, password: password2 }));
  };
  const demoUser = (e) => {
    setEmail(email1);
    setPassword(password1);
    dispatch(sessionActions.login({ email: email1, password: password1 }));
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="LoginModalWrapper">
      <div className="LoginModalContainer">
        <div className="LoginModalFormTitleContainer">
          <div className="LoginModalFormTitle">Welcome Back</div>
        </div>
        <form onSubmit={onLogin}>
          <div className="LoginErrorModalContainer">
            {errors.map((error) => (
              <div className="login-errors__container">{error}</div>
            ))}
          </div>
          <div className="LoginModalInputContainer">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
              require={"true"}
            />
          </div>
          <div className="LoginModalInputContainer">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
              require={"true"}
            />
          </div>
          <div className="LoginModalButtonContainer">
            <button className="LoginModalSubmit" type="submit">
              Login
            </button>
          </div>
          <div className="LoginModalButtonContainer">
            <button
              onClick={(e) => demoUser(e)}
              className="LoginModalSubmit"
              type="submit"
            >
              Demo User
            </button>
          </div>
          <div className="LoginModalButtonContainer">
            <button
              onClick={(e) => demoUser1(e)}
              className="LoginModalSubmit"
              type="submit"
            >
              Brunno Mars
            </button>
          </div>
          <div>
            <button className="not-a-member" onClick={onSignUp}>
              Not a Member? Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
