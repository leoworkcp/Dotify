const ALL_SONGS = "/songs/allSongs";
const USER_SONGS = "/songs/userSongs";
const SONG = "/songs/song";
const POST_COMMENT = "/songs/postComment";
const DELETE_COMMENT = "/songs/deleteComment";
const LIKE = "/songs/like";
const ALL_LIKES = "/songs/allLikes";

const allSongs = (songs) => {
  return {
    type: ALL_SONGS,
    songs: songs,
  };
};

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

const like = (like) => {
  return {
    type: LIKE,
    like: like,
  };
};

const allLikes = (likes) => {
  return {
    type: ALL_LIKES,
    likes: likes,
  };
};

// const oneSong = (song) => {
//   return {
//     type: GET_SONG,
//     song
//   }
// }

export const getAllSongs = () => async (dispatch) => {
  const res = await fetch("/api/songs/");

  const data = await res.json();

  dispatch(allSongs(data.songs));

  return data;
};
export const getUserSongs = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/songs/${userId}/`);
  const data = await res.json();
  console.log("data from thunk", data);
  dispatch(userSongs(data.songs));

  return data;
};
export const getSong = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}/`);
  const data = await res.json();
  dispatch(song(data.song));

  return data;
};

// comment POST
export const postUserComment = (comment, songId) => async (dispatch) => {
  const { description, user_id } = comment;
  const res = await fetch(`/api/songs/${songId}/comment/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
      user_id,
      song_id: songId,
    }),
  });

  const data = await res.json();
  console.log(data);
  dispatch(postComment(data));

  return data;
};
// comment DELETE
export const deleteUserComment = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/songs/comment/${commentId}/delete`, {
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

export const userLike = (songId, userId) => async (dispatch) => {
  const res = await fetch(`/api/songs/likes/${songId}/${userId}`);
  const data = await res.json();
  // console.log(data)
  dispatch(like(data));
  return data;
};

export const getAllLikes = () => async (dispatch) => {
  const res = await fetch("/api/songs/likes");
  const data = await res.json();
  dispatch(allLikes(data.likes));
  return data;
};

const initialState = {};

const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ALL_SONGS: {
      const allSongs = {};
      const songs = action.songs;
      // console.log(songs);
      // songs.forEach((song) => (allSongs[song.id] = song));
      return allSongs;
    }
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
    case ALL_LIKES: {
      newState = { ...state };
      const likes = action.likes;
      newState.likes = likes;
      return newState;
    }
    case LIKE: {
      newState = { ...state };
      const like = action.like;
      newState.likes = { ...state.likes, like };
      return newState;
    }
    default:
      return state;
  }
};

export default songsReducer;
