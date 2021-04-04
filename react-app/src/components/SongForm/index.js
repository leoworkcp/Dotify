import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { newUpload } from "../../store/upload";
import "./SongForm.css";
import { getUserSongs } from "../../store/songs";
import { useParams } from "react-router-dom";

const SongForm = ({ closeModalSongForm }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session.user);
  // console.log(user);
  const [errors, setErrors] = useState([]);
  const [song, setSong] = useState(null);
  const [songLoading, setSongLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [newSong, setNewSong] = useState(false);
  const [isLoaded, setIsLoaded] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const song_path = new FormData();
    song_path.append("song", song);
    song_path.append("image", image);
    const songAttributes = {
      name,
      description,
      artist_id: user.id,
      category,
    };
    setSongLoading(true);
    setImageLoading(true);
    closeModalSongForm();
    const res = await dispatch(newUpload(song_path, songAttributes));
    /* aws uploads can be a bit slow—displaying
    some sort of loading message is a good idea*/

    if (res.ok) {
      await res.json();
      setSongLoading(false);
      setImageLoading(false);
    } else {
      // setErrors(user.payload.errors);
      setSongLoading(false);
      setImageLoading(false);
    }
  };

  function extra(e) {
    const item = e.target.value;
    setIsLoaded((isLoaded) => [...isLoaded, item]);
  }
  const { userid } = useParams();
  const [userSongsLoaded, setUserSongsLoaded] = useState(false);
  const userSongs = useSelector((state) => state.songs.user_songs);
  let userSongsValues;
  userSongsLoaded
    ? (userSongsValues = Object.values(userSongs))
    : (userSongsValues = null);

  // console.log("user Id", userid);
  useEffect(() => {
    dispatch(getUserSongs(userid)).then((req) => setUserSongsLoaded(true));
    // dispatch(getAllSongs())
    return setNewSong(false);
  }, [dispatch, newSong, userid]);

  const updateSong = (e) => {
    const file = e.target.files[0];
    setSong(file);
  };
  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const newSongSubmit = () => {
    return setTimeout(() => {
      setNewSong(true);
    }, 10);
  };

  return (
    <div className="SignUpModalWrapper">
      <div className="SignUpModalContainer">
        <form onSubmit={handleSubmit}>
          <div className="SignUpModalFormTitleContainer">
            <div className="SignUpModalFormTitle">Upload a Song</div>
          </div>
          {/* <div className="LoginErrorModalContainer">
              {errors.map((error) => (
                <div className="login-errors__container">{error}</div>
              ))}
            </div> */}

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
            <button id="upload-submit-button" type="submit" onClick={extra}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SongForm;
