const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const EDIT_USER = "song/editUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const editUser = (updatedUser) => ({
  type: EDIT_USER,
  updatedUser,
});

// signup
export const signup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup/", {
    method: "POST",
    body: user,
  });
  const data = await response.json();
  console.log(data);
  return dispatch(setUser(data));
};

// login
export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  const response = await fetch("/api/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  return dispatch(setUser(data));
};

// logout
export const logout = () => (dispatch) => {
  fetch("/api/auth/logout/");
  return dispatch(removeUser());
};

// authenticate
export const restoreUser = () => async (dispatch) => {
  const response = await fetch("/api/auth/");
  const data = await response.json();
  return dispatch(setUser(data));
};

export const updateExistingUser = (user) => async (dispatch) => {
  console.log(user);
  const response = await fetch("/api/auth/edit/", {
    method: "PUT",
    body: user,
  });
  const updatedUser = await response.json();
  console.log("----------------");
  dispatch(editUser(updatedUser));
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case EDIT_USER:
      newState = Object.assign({}, state);
      newState.user = action.updatedUser;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
