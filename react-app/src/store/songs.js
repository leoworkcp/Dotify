// const ALL_SONGS = "/songs/allSongs";
const USER_SONGS = "/songs/userSongs";
const SONG = "/songs/song";
const POST_COMMENT = "/songs/postComment";
const DELETE_COMMENT = "/songs/deleteComment";

// new stuff
const SAVE_COMMENT = "comment/saveComment";
// const EDIT_COMMENT = "message/editComment";
const ADD_LIKE = "comment/addLike";

const saveComment = (comment) => ({
  type: SAVE_COMMENT,
  comment,
});

// const editComment = (updatedComment) => ({
//   type: EDIT_COMMENT,
//   updatedComment,
// });

const addLike = (updatedComment) => ({
  type: ADD_LIKE,
  updatedComment,
});

// export const saveCommentToState = (comment) => (dispatch) => {
//   // console.log(comment);
//   dispatch(SAVE_COMMENT(comment));
// };
// export const updateExistingComment = (updatedComment) => async (dispatch) => {
//   const response = await fetch("/api/songs/edit/", {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedComment),
//   });
//   const data = await response.json();
//   dispatch(editComment);
//   return data;
// };

export const addCommentLike = (commentId) => async (dispatch) => {
  const response = await fetch("/api/songs/like/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId }),
  });
  const updatedComment = await response.json();
  dispatch(addLike(updatedComment));
  return updatedComment;
};

// new stuff ends

// const allSongs = (songs) => {
//   return {
//     type: ALL_SONGS,
//     songs: songs,
//   };
// };

const userSongs = (songs) => {
  return {
    type: USER_SONGS,
    songs: songs,
  };
};
const song = (song) => {
  return {
    type: SONG,
    song: song,
  };
};

const postComment = (comment) => {
  return {
    type: POST_COMMENT,
    comment: comment,
  };
};

const deleteComment = () => {
  return {
    type: DELETE_COMMENT,
  };
};

// const oneSong = (song) => {
//   return {
//     type: GET_SONG,
//     song
//   }
// }

// export const getAllSongs = () => async (dispatch) => {
//   const res = await fetch("/api/songs/");

//   const data = await res.json();

//   dispatch(allSongs(data.songs));

//   return data;
// };
export const getUserSongs = (userid) => async (dispatch) => {
  if (!userid) return;
  else {
    const res = await fetch(`/api/users/songs/${userid}/`);
    const data = await res.json();
    // console.log("data", data);
    dispatch(userSongs(data.songs));

    return data;
  }
};
export const getSong = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}/`);
  const data = await res.json();
  dispatch(song(data.song));

  return data;
};

// comment POST
export const postUserComment = (comment, songId) => async (dispatch) => {
  const { description, user_id, created_at } = comment;
  const res = await fetch(`/api/songs/${songId}/comment/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
      user_id,
      song_id: songId,
      created_at,
    }),
  });

  const data = await res.json();
  console.log(data);
  dispatch(postComment(data));

  return data;
};
// comment DELETE
export const deleteUserComment = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/songs/comment/${commentId}/delete/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response", res);
  const data = await res.json();

  dispatch(deleteComment());

  return data;
};

const initialState = {};

const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    // case ALL_SONGS: {
    //   const allSongs = {};
    //   const songs = action.songs;
    //   // console.log(songs);
    //   // songs.forEach((song) => (allSongs[song.id] = song));
    //   return allSongs;
    // }
    case USER_SONGS: {
      newState = { ...state };
      // const userSongs = newState.user_songs = {}
      const songs = action.songs;
      const newObj = {};
      songs.forEach((song) => (newObj[song.id] = song));
      // newState.user_songs = {...action.songs}
      newState.user_songs = newObj;
      return newState;
    }
    case SONG: {
      newState = { ...state };
      // const userSongs = newState.user_songs = {}
      const song = action.song;
      newState.currentSong = song;
      return newState;
    }
    case POST_COMMENT: {
      newState = { ...state };
      // const userSongs = newState.user_songs = {}
      const comment = action.comment;
      newState.comment = comment;
      return newState;
    }
    case DELETE_COMMENT: {
      return state;
    }
    // case EDIT_COMMENT:
    //   return action.updatedComment;
    // case SAVE_COMMENT:
    //   return action.comment;
    case ADD_LIKE:
      return state;
    default:
      return state;
  }
};

export default songsReducer;
