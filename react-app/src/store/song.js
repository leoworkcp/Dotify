const ADD_SONG = "song/addSong";
const DELETE_SONG = "song/deleteSong";
const EDIT_SONG = "song/editSong";

const addSong = (newSong) => ({
  type: ADD_SONG,
  newSong,
});

const deleteSong = () => ({
  type: DELETE_SONG,
});

const editSong = (updatedSong) => ({
  type: EDIT_SONG,
  updatedSong,
});

//add a song
export const addNewSong = (songFormInput) => async (dispatch) => {
  const response = await fetch(`/api/songs/`, {
    method: "POST",
    body: songFormInput,
  });
  const data = await response.json();
  dispatch(addSong(data));
  return data;
};

// Delete existing song
export const deleteExistingSong = (songId) => async (dispatch) => {
  if (!songId) return;
  else {
    await fetch("/api/songs/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songId),
    });
    return dispatch(deleteSong());
  }
};

// Edit existing song
export const updateExistingSong = (songId) => async (dispatch) => {
  const response = await fetch("/api/songs/edit/", {
    method: "PUT",
    body: songId,
  });
  const updatedSong = await response.json();

  dispatch(editSong(updatedSong));
};

const initialState = {};
const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SONG:
      return { ...state, [action.newSong.id]: action.newSong };

    case DELETE_SONG:
      const newState = {};
      return state;

    case EDIT_SONG:
      return action.updatedSong;

    default:
      return state;
  }
};

export default songReducer;
