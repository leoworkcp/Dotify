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
    // height: "50px",
    // boxShadow: "3px 3px 3px #28292E",
    backgroundColor: "#18191C",

    // backgroundColor: "red",
    borderRadius: "5px",
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
    justifyContent: "space-around",
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
    setOpen(false);
  }

  function closeModalSongForm() {
    setIsOpenSongForm(false);
    setOpen(true);
  }

  function openModal() {
    setOpen(true);
  }

  // console.log(open);
  // console.log(modalIsOpenSongForm);
  // comment modal
  // const [openComments, setOpenComments] = useState(false);
  const [modalIsOpenComments, setIsOpenComments] = useState(false);

  function openModalComments() {
    setIsOpenComments(true);
    setOpen(false);
  }

  function closeModalComments() {
    setIsOpenComments(false);
    // setOpenComments(false);
    setOpen(true);
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
    setOpen(false);
  };

  useEffect(() => {
    if (deleted) {
      dispatch(getUserSongs(userid));
    }
  }, [deleted, dispatch, userid]);

  // useEffect(() => {
  //   if (modalIsOpenSongForm) {
  //     setOpen(false);
  //   }
  // }, [open, modalIsOpenSongForm]);
  return (
    <>
      <CustomIconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={(e) => openModal(e)}
        ref={anchorRef}
      >
        <MoreHorizIcon />
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
                <div>
                  <div className="edit-dropdown__container">
                    <CustomMenuItem>
                      <button
                        onClick={(e) => openModalSongForm(e)}
                        key={`edit${song.id}`}
                      >
                        Edit
                        <EditIcon
                          style={{ color: "white" }}
                          key={`edit-icon${song.id}`}
                        />
                      </button>
                    </CustomMenuItem>
                  </div>
                </div>
              )}
              {Number(loggedInUserId) === song.artist_id && (
                <div>
                  <div className="edit-dropdown__container">
                    <CustomMenuItem>
                      <button
                        className={`delete-song__btn ${song.artist_id}`}
                        id={song.id}
                        userid={song.artist_id}
                        onClick={(e) => deleteSong(e)}
                        key={`delete${song.id}`}
                      >
                        Delete
                        <DeleteIcon
                          style={{ color: "white" }}
                          key={`delete-icon${song.id}`}
                        />
                      </button>
                    </CustomMenuItem>
                  </div>
                </div>
              )}

              <div className="edit-dropdown__container">
                <CustomMenuItem>
                  <button
                    onClick={(e) => openModalComments(e)}
                    key={`comment${song.id}`}
                  >
                    Comments
                    <CommentRoundedIcon
                      style={{ color: "white" }}
                      key={`comment-icon${song.id}`}
                    />
                  </button>
                </CustomMenuItem>
              </div>

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
    </>
  );
};

export default MessageDropdown;
