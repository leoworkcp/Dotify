import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { newUpload } from "../../store/upload";
import "./SongForm.css";
import { getUserSongs } from "../../store/songs";
import { findPublicSongs } from "../../store/publicSongs";
import { useParams } from "react-router-dom";
import * as musicActions from "../../store/song";
const SongForm = ({ closeModalSongForm }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session.user);
  // console.log(user);
  const [errors, setErrors] = useState([]);

  const [songLoading, setSongLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [newSong, setNewSong] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [upSong, setUpSong] = useState("");
  // const [isPublic, setIsPublic] = useState(true);
  const [category, setCategory] = useState("");
  const [album, setAlbum] = useState("");
  const [isLoaded, setIsLoaded] = useState([]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const song_path = new FormData();
  //   song_path.append("song", song);
  //   song_path.append("image", image);
  //   const songAttributes = {
  //     name,
  //     description,
  //     artist_id: user.id,
  //     category,
  //   };
  //   setSongLoading(true);
  //   setImageLoading(true);
  //   closeModalSongForm();
  //   const res = await dispatch(newUpload(song_path, songAttributes));
  //   /* aws uploads can be a bit slow—displaying
  //   some sort of loading message is a good idea*/

  //   if (res.ok) {
  //     await res.json();
  //     setSongLoading(false);
  //     setImageLoading(false);
  //   } else {
  //     // setErrors(user.payload.errors);
  //     setSongLoading(false);
  //     setImageLoading(false);
  //   }
  // };

  const onUpload = async (e) => {
    e.preventDefault();
    setSongLoading(true);
    setImageLoading(true);
    const formData = new FormData();
    formData.append("artist_id", user.id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image_url", image);
    formData.append("song", upSong);
    // formData.append("public", isPublic);
    formData.append("category", category);
    formData.append("album", album);

    const song = await dispatch(musicActions.addNewSong(formData));
    dispatch(getUserSongs(user.id));
    dispatch(findPublicSongs());
    closeModalSongForm();

    // if (song.ok) {
    //   setSongLoading(false);
    //   setImageLoading(false);
    //   closeModalSongForm();
    // } else {
    //   let newError = ["try again we had an issue with the request"];
    //   setErrors(newError);
    // }
  };

  // function extra(e) {
  //   const item = e.target.value;
  //   setIsLoaded((isLoaded) => [...isLoaded, item]);
  // }

  // const [userSongsLoaded, setUserSongsLoaded] = useState(false);
  // const userSongs = useSelector((state) => state.songs.user_songs);
  // useEffect(() => {
  //   if (!userid) return;
  //   else {
  //     let userSongsValues;
  //     userSongsLoaded
  //       ? (userSongsValues = Object.values(userSongs))
  //       : (userSongsValues = null);

  //     dispatch(getUserSongs(userid)).then((req) => setUserSongsLoaded(true));
  //     return setNewSong(false);
  //   }
  // }, [dispatch, newSong, userid]);

  const updateSong = (e) => {
    const file = e.target.files[0];
    setUpSong(file);
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
            <div className="SignUpModalFormTitle">Upload a Song</div>
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
          <div className="SignUpModalInputContainer">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className="SignUpModalInputContainer">
            <label>album</label>
            <input
              type="text"
              placeholder="album"
              value={album}
              onChange={(e) => {
                setAlbum(e.target.value);
              }}
            />
          </div>
          {/* new stuff */}
          {/* <div className="SignUpModalInputContainer">
            <label>Public:</label>
            <input
              type="radio"
              name="drone"
              value={true}
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
          <div className="SignUpModalInputContainer">
            <label>Category</label>
            <input
              type="text"
              placeholder="Genre"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="SignUpModalInputContainer">
            <label>Upload a song file</label>
            <input
              type="file"
              accept="audio/*"
              onChange={updateSong}
              required
            />
            {songLoading && <p>Loading...</p>}
          </div>
          <div className="SignUpModalInputContainer">
            <label>Upload an album image</label>
            <input type="file" accept="image/*" onChange={updateImage} />
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

export default SongForm;
