const FIND_USER_LIKES = "song/findUserLikes";
const REMOVE_USER_LIKES = "song/removeUserLikes";

const findUserLikes = (userLikes) => ({
  type: FIND_USER_LIKES,
  userLikes,
});

const removeUserLikes = () => ({
  type: REMOVE_USER_LIKES,
});

export const fetchUserLikes = (userId) => async (dispatch) => {
  if (!userId) return;
  const response = await fetch("/api/auth/likes/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
  });
  const userLikes = await response.json();
  return dispatch(findUserLikes(userLikes));
};

export const resetUserLikes = () => async (dispatch) => {
  dispatch(removeUserLikes());
};

export const addLike = (songId, userId) => async (dispatch) => {
  const response = await fetch("/api/auth/likes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ songId, userId }),
  });
  const userLikes = await response.json();

  return dispatch(findUserLikes(userLikes));
};

export const removeLike = (songId, userId) => async (dispatch) => {
  const response = await fetch("/api/auth/likes/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ songId, userId }),
  });
  const userLikes = await response.json();
  return dispatch(findUserLikes(userLikes));
};

const likesReducer = (state = [], action) => {
  switch (action.type) {
    case FIND_USER_LIKES:
      return action.userLikes;
    case REMOVE_USER_LIKES:
      const newState = [];
      return newState;
    default:
      return state;
  }
};

export default likesReducer;
