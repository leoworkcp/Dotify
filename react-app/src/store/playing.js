const SET_SONG = "playing/setSong";

const setSong = (url) => ({
  type: SET_SONG,
  url,
});

export const setCurrentSong = (url) => async (dispatch) => {
  dispatch(setSong(url));
};

let initialState = {};
const playingReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_SONG: {
      newState = { ...state };
      newState.playing = action.url;
      return newState;
    }
    default:
      return state;
  }
};

export default playingReducer;
