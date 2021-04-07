import React, { useState } from "react";
import "./SongPage.css";
// this one didn't worked
// import Player from "react-wavy-audio";

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
        return (
          <div className="song_page" key={idx}>
            {Number(songId) === song.id && (
              <div className="song-page__title">
                {console.log(song.song)}
                <h1>{song.name}</h1>
                <h2>{song.category}</h2>
                {/* <Player
                  imageUrl="https://pbs.twimg.com/media/A-lU5FnCcAA1Edi.jpg"
                  audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                  waveStyles={{
                    cursorWidth: 1,
                    progressColor: "#ee3ec9",
                    responsive: true,
                    waveColor: "#121640",
                    cursorColor: "transparent",
                    barWidth: 0,
                  }}
                  zoom={0}
                  // waveJson
                  // hideImage="true"
                  // hideWave="true"
                  // containerStyle={}
                /> */}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default SongPage;
