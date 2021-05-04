import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./SongForm.css";
import { getUserSongs } from "../../store/songs";
import { findPublicSongs } from "../../store/publicSongs";
// import { useParams } from "react-router-dom";
import * as musicActions from "../../store/song";
const EditSongForm = ({ closeModalSongForm, songsId, song }) => {
  const dispatch = useDispatch();

  //   console.log(song);

  const user = useSelector((state) => state?.session.user);
  // console.log(user);
  const [errors, setErrors] = useState([]);

  const [songLoading, setSongLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  // const [newSong, setNewSong] = useState(false);

  const [name, setName] = useState(song.name);
  const [description, setDescription] = useState(song.description);
  const [image, setImage] = useState(song.image_url);
  const [upSong, setUpSong] = useState(song.song);
  // const [isPublic, setIsPublic] = useState(true);
  const [category, setCategory] = useState(song.category);
  const [album, setAlbum] = useState(song.album);

  // const [isLoaded, setIsLoaded] = useState([]);
  //   console.log(typeof songsId);
  const onUpload = async (e) => {
    e.preventDefault();
    setSongLoading(true);
    setImageLoading(true);
    const formData = new FormData();
    formData.append("id", songsId);
    formData.append("artist_id", user.id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image_url", image);
    formData.append("song", upSong);
    // formData.append("public", isPublic);
    formData.append("category", category);
    formData.append("album", album);

    const song = await dispatch(musicActions.updateExistingSong(formData));
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
            <div className="SignUpModalFormTitle">{`Edit ${song.name} `}</div>
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

export default EditSongForm;
