import React, { useState } from "react";
import "./SongPage.css";
import banner1 from "./banner1.jpg";
import { useParams } from "react-router";
function SongPage({
  publicSongs,
  loggedInUser,
  authenticated,
  setAuthenticated,
}) {
  const { songId } = useParams();
  //   console.log(typeof songId);
  console.log(publicSongs);
  return (
    <>
      {publicSongs.map((song, idx) => {
        if (Number(songId) === song.id) {
          return (
            <div className="song_page" key={idx}>
              <img src={banner1} alt="banner" />
              <div className="cover-div">
                <img src={song.image_url} alt="song-cover" />
              </div>
              <div className="song-page__title">
                <h1>{song.name}</h1>
                <h2>{song.category}</h2>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}

export default SongPage;
