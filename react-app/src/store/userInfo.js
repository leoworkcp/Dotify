const FIND_USER_SONGS = "song/findUserSongs";
const REMOVE_USER_SONGS = "song/removeUserSongs";

const findUserSongs = (userSongs) => ({
  type: FIND_USER_SONGS,
  userSongs,
});

const removeUserSongs = () => ({
  type: REMOVE_USER_SONGS,
});

export const fetchUserSongs = (userId) => async (dispatch) => {
  if (!userId) return;
  const response = await fetch("/api/users/songs/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
  });
  const userSongs = await response.json();
  return dispatch(findUserSongs(userSongs));
};

export const resetUserSongs = () => async (dispatch) => {
  dispatch(removeUserSongs());
};

export const joinSong = (songId, userId) => async (dispatch) => {
  const response = await fetch("/api/users/songs/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ songId, userId }),
  });
  const userSongs = await response.json();
  return dispatch(findUserSongs(userSongs));
};

const userInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case FIND_USER_SONGS:
      return action.userSongs;
    case REMOVE_USER_SONGS:
      state = {};
      return state;
    default:
      return state;
  }
};

export default userInfoReducer;
