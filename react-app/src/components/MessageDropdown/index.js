import React, { useState, useEffect, useRef } from "react";

import { getUserSongs } from "../../store/songs";
import { findPublicSongs } from "../../store/publicSongs";
import {
  MenuList,
  MenuItem,
  Popper,
  Paper,
  IconButton,
  ClickAwayListener,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CommentRoundedIcon from "@material-ui/icons/CommentRounded";
import EditSongForm from "../SongForm/editSongForm";
import CommentForm from "../CommentForm/CommentForm";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { deleteExistingSong } from "../../store/song";
import "./MessageDropdown.css";
const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 5,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#181818",
    border: "none",
  },
};

Modal.setAppElement("#root");

const CustomMenuList = withStyles({
  root: {
    // width: "150px",
    height: "50px",
    // boxShadow: "3px 3px 3px #28292E",
    backgroundColor: "#18191C",
    borderRadius: "10px",
    position: "relative",
    zIndex: 2,
  },
})(MenuList);

const CustomMenuItem = withStyles({
  root: {
    "&:hover": {
      backgroundColor: "#383838",
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

const CustomIconButton = withStyles({
  root: {
    padding: "6px",
    position: "relative",
    zIndex: 0,
    boxSizing: "border-box",
  },
})(IconButton);

const MessageDropdown = ({
  authenticated,
  setAuthenticated,
  songsId,
  song,
  loggedInUser,
  userid,
}) => {
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [modalIsOpenSongForm, setIsOpenSongForm] = useState(false);
  //  new stuff delete song
  // const [deleteShown, setDeleteShown] = useState(true);
  const [deleted, setDeleted] = useState(false);

  let loggedInUserId;
  if (loggedInUser) loggedInUserId = loggedInUser?.id;

  // console.log(song);

  // console.log(userid);
  //  end delete song

  function openModalSongForm() {
    setIsOpenSongForm(true);
  }

  function closeModalSongForm() {
    setIsOpenSongForm(false);
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  // comment modal
  const [openComments, setOpenComments] = useState(false);
  const [modalIsOpenComments, setIsOpenComments] = useState(false);

  function openModalComments() {
    setIsOpenComments(true);
  }

  function closeModalComments() {
    setIsOpenComments(false);
    setOpenComments(false);
  }

  function openModal2() {
    setOpenComments(true);
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // console.log(typeof userid);

  const deleteSong = (e) => {
    if (Number(userid) === Number(e.target.className.split(" ")[1])) {
      // console.log(typeof e.target.id);
      dispatch(deleteExistingSong(e.target.id));

      setDeleted(true);
      setTimeout(() => {
        setDeleted(false);
      }, 100);
    }
    dispatch(findPublicSongs());
    dispatch(getUserSongs(userid));
  };

  // useEffect(() => {
  //   dispatch(getUserSongs(userid));
  // }, [deleted, deleteShown]);

  useEffect(() => {
    if (deleted) {
      dispatch(getUserSongs(userid));
    }
  }, [deleted, dispatch, userid]);
  // console.log(deleted);
  // console.log(deleteShown);
  // console.log(userid);
  // console.log(song.artist_id);

  return (
    <>
      <CustomIconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={(e) => openModal(e)}
        ref={anchorRef}
      >
        <MoreHorizIcon style={{ color: "white" }} />
      </CustomIconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Paper
          style={{
            backgroundColor: "#18191C",
            marginBottom: "3px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <CustomMenuList style={{ color: "white" }}>
              {Number(loggedInUserId) === song.artist_id && (
                <CustomMenuItem onClick={(e) => openModal(e)}>
                  <div className="edit-dropdown__container">
                    <button onClick={(e) => openModalSongForm(e)}>Edit</button>
                    <EditIcon style={{ color: "white" }} />
                  </div>
                  <div className="LoginSongForm">
                    <Modal
                      isOpen={modalIsOpenSongForm}
                      onRequestClose={closeModalSongForm}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <EditSongForm
                        songsId={songsId}
                        song={song}
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                        closeModalSongForm={closeModalSongForm}
                      />
                    </Modal>
                  </div>
                </CustomMenuItem>
              )}
              {Number(loggedInUserId) === song.artist_id && (
                <CustomMenuItem>
                  <div className="edit-dropdown__container">
                    <button
                      className={`delete-song__btn ${song.artist_id}`}
                      id={song.id}
                      userid={song.artist_id}
                      onClick={(e) => deleteSong(e)}
                    >
                      Delete
                    </button>
                  </div>
                  <DeleteIcon style={{ color: "white" }} />
                </CustomMenuItem>
              )}
              {/* view comments modal */}
              <CustomMenuItem onClick={(e) => openModal2(e)}>
                <div className="edit-dropdown__container">
                  <button onClick={(e) => openModalComments(e)}>
                    Comments
                  </button>
                  <CommentRoundedIcon style={{ color: "white" }} />
                </div>
                <div className="LoginSongForm">
                  <Modal
                    isOpen={modalIsOpenComments}
                    onRequestClose={closeModalComments}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <CommentForm
                      closeModalComments={closeModalComments}
                      songsId={songsId}
                    />
                  </Modal>
                </div>
              </CustomMenuItem>
              {/* view comments modal ends*/}
            </CustomMenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
      {/* <ConfirmDeleteMessage
        showDeleteMessageModal={showDeleteMessageModal}
        setShowDeleteMessageModal={setShowDeleteMessageModal}
      />
      <EditMessageForm
        showEditMessageModal={showEditMessageModal}
        setShowEditMessageModal={setShowEditMessageModal}
      /> */}
    </>
  );
};

export default MessageDropdown;
