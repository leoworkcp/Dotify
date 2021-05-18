import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../../store/session";
import "./SignUpForm.css";

const EditUserForm = ({ closeEditUserForm }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState(user.username);
  const [userId, setUserId] = useState(user.id);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(user.profile_URL);

  const onSignUp = async (e) => {
    e.preventDefault();
    setImageLoading(true);

    const formData1 = new FormData();
    formData1.append("id", userId);
    formData1.append("username", username);
    formData1.append("email", email);

    formData1.append("password", password);

    formData1.append("profile_URL", image);
    // console.log(formData1);

    if (
      password === repeatPassword &&
      password.length >= 8 &&
      password.length <= 50 &&
      password.search(/[0-9]/) > 0 &&
      password.search(/[A-Z]/) > -1 &&
      username.length >= 5 &&
      username.length <= 20 &&
      email.includes("@") &&
      email.includes(".")
    ) {
      const user = await dispatch(sessionActions.updateExistingUser(formData1));
      closeEditUserForm();
    } else if (password !== repeatPassword) {
      return setErrors("Password Most Match");
    } else if (password.search(/[0-9]/) < 1) {
      return setErrors("Password must contain 1 number");
    } else if (password.search(/[A-Z]/) < 0) {
      return setErrors("Password must contain 1 capital letter");
    } else if (password.length < 8 || password.length > 50) {
      return setErrors("Password must be between 8 and 50 characters");
    } else if (username.length < 5 || username.length > 20) {
      return setErrors("Username must be between 5 and 20 characters");
    } else if (!email.includes("@") || !email.includes(".")) {
      return setErrors("Provided email is not an email address");
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="SignUpModalWrapper">
      <div className="SignUpModalContainer">
        <form onSubmit={onSignUp}>
          <div className="SignUpModalFormTitleContainer">
            <div className="SignUpModalFormTitle">{`Edit ${user.username} Profile`}</div>
          </div>
          <div className="LoginErrorModalContainer">
            {errors && <div className="login-errors__container">{errors}</div>}
          </div>
          <div className="SignUpModalInputContainer">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="SignUpModalInputContainer">
            <label>Email</label>
            <input
              type="text"
              placeholder={`${user.username}@gmail.com`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="SignUpModalInputContainer">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="SignUpModalInputContainer">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
          <div className="SignUpModalInputContainer">
            <label>Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
              //   defaultValue={image}
              //   value={image}
            />
            {imageLoading && <p>Loading...</p>}
          </div>
          <div id="upload-submit-button-div">
            <button id="upload-submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
