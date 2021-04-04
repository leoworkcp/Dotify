const FIND_PUBLIC_SONG = "song/findPublicSong";

const findPublicSong = (songs) => ({
  type: FIND_PUBLIC_SONG,
  songs,
});

// find all public ssongs

export const findPublicSongs = () => async (dispatch) => {
  const response = await fetch("/api/songs/public/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const publicSongs = await response.json();
  dispatch(findPublicSong(publicSongs));
};

const initialState = {};
const publicSongReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PUBLIC_SONG:
      return action.songs;
    default:
      return state;
  }
};

export default publicSongReducer;
