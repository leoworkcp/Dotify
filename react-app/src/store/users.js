// import { setAuthErrors } from "./errors";

const ALL_USERS = "users/allUsers";
const ARTIST = "users/artist";

const allUsers = (users) => {
  return {
    type: ALL_USERS,
    users: users,
  };
};

const artist = (artist) => {
  return {
    type: ARTIST,
    artist: artist,
  };
};

export const getAllUsers = () => async (dispatch) => {
  const res = await fetch("/api/users/");
  const data = await res.json();
  //   if (data.errors) {
  //     dispatch(setAuthErrors(res.errors));
  //   } else {
  dispatch(allUsers(data.users));
  return data;
  //   }
};

export const getArtist = (artistId) => async (dispatch) => {
  const res = await fetch(`/api/artists/${artistId}`);
  const data = await res.json();
  dispatch(artist(data.artist));
  console.log("artist data", data);
  return data;
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ALL_USERS: {
      return action.users;
    }
    case ARTIST: {
      newState = { ...state };
      const artist = action.artist;
      newState.artist = artist;
      return newState;
    }
    default:
      return state;
  }
};

export default usersReducer;
