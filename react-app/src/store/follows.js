const FIND_USER_FOLLOWS = "follows/findUserFollows";
const FIND_USER_FOLLOWER = "follows/findUserFollower";
const REMOVE_USER_FOLLOWS = "follows/removeUserFollows";

const findUserFollows = (userFollows) => ({
  type: FIND_USER_FOLLOWS,
  userFollows,
});

const removeUserFollows = () => ({
  type: REMOVE_USER_FOLLOWS,
});

export const fetchUserFollows = (userId) => async (dispatch) => {
  if (!userId) return;
  const response = await fetch("/api/follows/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  const userFollows = await response.json();
  // console.log(userFollows);
  return dispatch(findUserFollows(userFollows));
};

export const addFollow =
  (following_userId, followers_userId) => async (dispatch) => {
    const response = await fetch("/api/follows/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ following_userId, followers_userId }),
    });
    const userFollows = await response.json();
    return dispatch(findUserFollows(userFollows));
  };

export const removeFollow =
  (following_userId, followers_userId) => async (dispatch) => {
    const response = await fetch("/api/follows/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ following_userId, followers_userId }),
    });
    const userFollows = await response.json();
    return dispatch(findUserFollows(userFollows));
  };

const followsReducer = (state = [], action) => {
  switch (action.type) {
    case FIND_USER_FOLLOWS:
      return action.userFollows;
    case REMOVE_USER_FOLLOWS:
      const newState = [];
      return newState;
    default:
      return state;
  }
};

export default followsReducer;
