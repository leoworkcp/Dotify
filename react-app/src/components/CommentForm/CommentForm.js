import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// like icons
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import Timestamp from "react-timestamp";
//
import {
  MenuList,
  MenuItem,
  Popper,
  Paper,
  IconButton,
  ClickAwayListener,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/styles";
//
import { postUserComment, userLike } from "../../store/songs";
import "./CommentForm.css";
import { getSong } from "../../store/songs";

import { getArtist } from "../../store/users";

import { deleteUserComment, getAllLikes } from "../../store/songs";
// new Imports
const CustomMenuList = withStyles({
  root: {
    width: "150px",
    boxShadow: "3px 3px 3px #28292E",
    backgroundColor: "#18191C",
    borderRadius: "5px",
    position: "relative",
    zIndex: 2,
  },
})(MenuList);

const CustomMenuItem = withStyles({
  root: {
    "&:hover": {
      backgroundColor: "#7289DA",
      borderRadius: "5px",
    },
    padding: "5px 10px",
    margin: "0px 6px",
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 2,
  },
})(MenuItem);
const CommentForm = ({ songsId }) => {
  //
  const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
  const [showEditMessageModal, setShowEditMessageModal] = useState(false);

  const openEditMessageModal = (e) => {
    setShowEditMessageModal((prev) => !prev);
  };
  const openDeleteMessageModal = (e) => {
    setShowDeleteMessageModal((prev) => !prev);
  };

  //

  // const { userId } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const history = useHistory();

  // new Stuff -------------------------->>>\
  // const likes = useSelector((state) => state.songs.likes);
  const sessionUser = useSelector((state) => state?.session);
  // const allLikes = useSelector((state) => state.songs.likes);
  // const artist = useSelector((state) => state.users);
  const song = useSelector((state) => state.songs?.currentSong);

  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteShown, setDeleteShown] = useState(true);
  const [newComment, setNewComment] = useState(false);
  const [deleted, setDeleted] = useState(false);

  let comments;
  let userId;

  // const someFunction = () => {
  //   console.log("hello", sessionUser?.user?.id)
  //   if (allLikes && sessionUser.user) {
  //     return allLikes?.forEach((like) => {
  //       if (sessionUser?.user?.id == like.user_id) {
  //         return setLiked(true);
  //       }
  //     });
  //   }
  // };

  if (sessionUser.user) userId = sessionUser?.user?.id;

  if (isLoaded) {
    comments = song.comments;
  }

  const commentSubmit = async (e) => {
    e.preventDefault();

    // if (!sessionUser?.user) history.push("/");
    const userComment = {
      user_id: Number(userId),
      description: comment,
    };

    await dispatch(postUserComment(userComment, songsId));
  };

  const likeSong = (e) => {
    e.preventDefault();
    dispatch(userLike(songsId, userId));
    return setTimeout(() => {
      setLiked(true);
    }, 100);
  };

  const newCommentSubmit = () => {
    return setTimeout(() => {
      setNewComment(true);
    }, 10);
  };

  const deleteComment = (e) => {
    if (userId == e.target.className.split(" ")[1]) {
      dispatch(deleteUserComment(e.target.id));
      setDeleted(true);
      setTimeout(() => {
        setDeleted(false);
      }, 100);
    }
  };

  useEffect(() => {
    setComment("");
  }, [newComment, liked]);

  useEffect(async () => {
    dispatch(getSong(songsId)).then(() => setIsLoaded(true));
    // dispatch(getAllLikes());

    return setNewComment(false);
  }, [dispatch, newComment, deleted]);

  return (
    isLoaded && (
      <div className="SignUpModalWrapper">
        <div className="SignUpModalContainer">
          <div className="SignUpModalFormTitleContainer">
            <div className="SignUpModalFormTitle">Comments</div>
          </div>
          <div
            className="comment-form__container"
            // onMouseEnter={() => setDeleteShown(true)}
            // onMouseLeave={() => setDeleteShown(false)}
          >
            {comments?.map((comment) => {
              {
                console.log(comment);
              }
              return (
                <>
                  <div id={comment.id} className="comment-container">
                    <p id="old-comments">{comment?.description}</p>

                    <div id="like-comment__container">
                      {liked ? (
                        <button id="btn-likes" onClick={likeSong}>
                          <FavoriteRoundedIcon id="like-btn" />
                        </button>
                      ) : (
                        <button id="btn-likes" onClick={likeSong}>
                          <FavoriteBorderRoundedIcon id="liked-btn" />
                        </button>
                      )}
                      <Timestamp
                        // relative
                        date={comment.created_at}
                        options={{ includeDay: true, twentyFourHour: true }}
                        autoUpdate
                      />
                      {deleteShown && userId === comment.user_id && (
                        <button
                          className={`delete-comment__btn ${comment.user_id}`}
                          id={comment.id}
                          userId={comment.user_id}
                          onClick={deleteComment}
                        >
                          🗑️
                          {/* <DeleteIcon /> */}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              );
            })}

            <form onSubmit={commentSubmit}>
              <div className="SignUpModalInputContainer">
                <textarea
                  id="textarea-id"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment at..."
                ></textarea>
              </div>
              <div className="SignUpModalButtonContainer" id="submit-comment">
                <button
                  id="comment-submit"
                  className="SignUpModalSubmit"
                  onClick={newCommentSubmit}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
            {/* <ConfirmDeleteMessage
        showDeleteMessageModal={showDeleteMessageModal}
        setShowDeleteMessageModal={setShowDeleteMessageModal}
      />
      <EditMessageForm
        showEditMessageModal={showEditMessageModal}
        setShowEditMessageModal={setShowEditMessageModal}
      /> */}
          </div>
        </div>
      </div>
    )
  );
};

export default CommentForm;
