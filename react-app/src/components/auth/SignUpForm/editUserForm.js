import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./SignUpForm.css";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";

// import { fetchUserSongs } from "../../../store/userInfo";

const EditUserForm = ({
  authenticated,
  setAuthenticated,
  closeModalSignUp,
  openModalLogin,
  closeEditUserForm,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  //   const [errors, setErrors] = useState([]);
  //   const [username, setUsername] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [repeatPassword, setRepeatPassword] = useState("");
  //   const [image, setImage] = useState([]);
  //   const [imageLoading, setImageLoading] = useState(false);

  const history = useHistory();
  console.log(user);

  //   const onSignUp = async (e) => {
  //     e.preventDefault();
  //     setImageLoading(true);

  //     const formData1 = new FormData();
  //     formData1.append("username", username);
  //     formData1.append("email", email);

  //     formData1.append("password", password);

  //     formData1.append("image", image);
  //     console.log(formData1);

  //     const user = await dispatch(sessionActions.signup(formData1));

  //     if (password === repeatPassword) {
  //       if (!user.payload.errors) {
  //         setImageLoading(false);
  //         setAuthenticated(true);
  //         // dispatch(fetchUserSongs(user.payload.id));

  //         return history.push("/");
  //       } else {
  //         setErrors(user.payload.errors);
  //       }
  //     }
  //   };

  //   let passwordValidation = "";

  //   if (password !== repeatPassword) {
  //     passwordValidation = "Password must match!";
  //   }

  //   const onLogin = (e) => {
  //     e.preventDefault();
  //     closeEditUserForm();
  //     openModalLogin();
  //   };

  //   const updateUsername = (e) => {
  //     setUsername(e.target.value);
  //   };

  //   const updateEmail = (e) => {
  //     setEmail(e.target.value);
  //   };

  //   const updatePassword = (e) => {
  //     setPassword(e.target.value);
  //   };

  //   const updateRepeatPassword = (e) => {
  //     setRepeatPassword(e.target.value);
  //   };

  //   if (authenticated) {
  //     return <Redirect to="/" />;
  //   }

  //   const updateImage = (e) => {
  //     console.log(e.target.files[0]);
  //     const file = e.target.files[0];
  //     setImage(file);
  //   };

  //   return (
  //     <div className="SignUpModalWrapper">
  //       <div className="SignUpModalContainer">
  //         <div className="SignUpModalFormTitleContainer">
  //           <div className="SignUpModalFormTitle">Register</div>
  //         </div>
  //         <form onSubmit={onSignUp}>
  //           <div className="LoginErrorModalContainer">
  //             {/* {validLength ? <span>True</span> : <span>False</span>} */}
  //             <div className="login-errors__container"> {passwordValidation}</div>
  //             {errors.map((error) => (
  //               <div className="login-errors__container">{error}</div>
  //             ))}
  //           </div>
  //           <div className="SignUpModalInputContainer">
  //             <label>User Name</label>
  //             <input
  //               type="text"
  //               name="username"
  //               onChange={updateUsername}
  //               value={username}
  //             ></input>
  //           </div>
  //           <div className="SignUpModalInputContainer">
  //             <label>Email</label>
  //             <input
  //               type="text"
  //               name="email"
  //               onChange={updateEmail}
  //               value={email}
  //             ></input>
  //           </div>
  //           <div className="SignUpModalInputContainer">
  //             <label>Password</label>
  //             <input
  //               type="password"
  //               name="password"
  //               onChange={updatePassword}
  //               // onChange={setFirst}
  //               value={password}
  //               required="true"
  //             ></input>
  //           </div>
  //           <div className="SignUpModalInputContainer">
  //             <label>Repeat Password</label>
  //             <input
  //               type="password"
  //               name="repeat_password"
  //               onChange={updateRepeatPassword}
  //               // onChange={setSecond}
  //               value={repeatPassword}
  //               required="true"
  //             ></input>
  //           </div>
  //           <div className="SignUpModalInputContainer">
  //             <label htmlFor="image">Profile Image</label>
  //             <input
  //               type="file"
  //               name="image"
  //               accept="image/*"
  //               onChange={updateImage}
  //             />
  //             {imageLoading && <p>Loading...</p>}
  //           </div>
  //           <div className="SignUpModalButtonContainer">
  //             <button className="SignUpModalSubmit" type="submit">
  //               Sign Up
  //             </button>
  //           </div>
  //           {/* <div>
  //             <button className="already-a-member" onClick={onLogin}>
  //               Already a Member? Log In
  //             </button>
  //           </div> */}
  //         </form>
  //       </div>
  //     </div>
  //   );
  // };

  const [errors, setErrors] = useState([]);

  const [songLoading, setSongLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  // const [newSong, setNewSong] = useState(false);

  const [name, setName] = useState(user.username);

  const [image, setImage] = useState(user.image_URL);

  //   const [upSong, setUpSong] = useState(song.song);
  // const [isPublic, setIsPublic] = useState(true);
  //   const [category, setCategory] = useState(song.category);
  //   const [album, setAlbum] = useState(song.album);

  // const [isLoaded, setIsLoaded] = useState([]);
  //   console.log(typeof songsId);
  const onUpload = async (e) => {
    e.preventDefault();
    // setSongLoading(true);
    // setImageLoading(true);
    // const formData = new FormData();
    // formData.append("id", songsId);
    // formData.append("artist_id", user.id);
    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("image_url", image);
    // formData.append("song", upSong);
    // // formData.append("public", isPublic);
    // formData.append("category", category);
    // formData.append("album", album);

    // const song = await dispatch(musicActions.updateExistingSong(formData));
    // dispatch(getUserSongs(user.id));
    // dispatch(findPublicSongs());
    // closeModalSongForm();

    // if (song.ok) {
    //   setSongLoading(false);
    //   setImageLoading(false);
    //   closeModalSongForm();
    // } else {
    //   let newError = ["try again we had an issue with the request"];
    //   setErrors(newError);
    // }
  };

  const updateSong = (e) => {
    const file = e.target.files[0];
    // setUpSong(file);
  };
  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="SignUpModalWrapper">
      <div className="SignUpModalContainer">
        <form onSubmit={onUpload}>
          <div className="SignUpModalFormTitleContainer">
            <div className="SignUpModalFormTitle">{`Edit ${user.username} Profile`}</div>
          </div>
          <div className="LoginErrorModalContainer">
            {errors.map((error) => (
              <div className="login-errors__container">{error}</div>
            ))}
          </div>
          <div className="SignUpModalInputContainer">
            <label>Song Title</label>
            <input
              type="text"
              placeholder="Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {/* <div className="SignUpModalInputContainer">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div> */}

          {/* <div className="SignUpModalInputContainer">
            <label>album</label>
            <input
              type="text"
              placeholder="album"
                value={album}
              onChange={(e) => {
                setAlbum(e.target.value);
              }}
            />
          </div> */}
          {/* new stuff */}
          {/* <div className="SignUpModalInputContainer">
            <label>Public:</label>
            <input
              type="radio"
              name="drone"
              value="true"
              onChange={() => setIsPublic(true)}
              checked={isPublic === true}
            />
            <label htmlFor="true">Yes</label>
            <input
              type="radio"
              name="drone"
              value={false}
              onChange={(e) => setIsPublic(false)}
              checked={isPublic === false}
            />
            <label htmlFor="false">No</label>
          </div> */}
          {/* new stuff  ends*/}
          {/* <div className="SignUpModalInputContainer">
            <label>Category</label>
            <input
              type="text"
              placeholder="Genre"
              //   value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div> */}
          {/* <div className="SignUpModalInputContainer">
            <label>Upload a song file</label>
            <input
              type="file"
              accept="audio/*"
              onChange={updateSong}
              required
            />
            {songLoading && <p>Loading...</p>}
          </div> */}
          <div className="SignUpModalInputContainer">
            <label>Upload an album image</label>
            <input type="file" accept="image/*" onChange={updateImage} s />
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
