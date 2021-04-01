import React, { useState, useRef } from "react";
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

import SongForm from "../SongForm/index";
import Modal from "react-modal";

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
    backgroundColor: "#2c2f33",
    border: "none",
  },
};

Modal.setAppElement("#root");

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

const MessageDropdown = ({ authenticated, setAuthenticated }) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
  const [showEditMessageModal, setShowEditMessageModal] = useState(false);
  const [modalIsOpenSongForm, setIsOpenSongForm] = useState(false);

  function openModalSongForm() {
    setIsOpenSongForm(true);
  }

  function closeModalSongForm() {
    setIsOpenSongForm(false);
    setOpen(false);
  }

  const openEditMessageModal = (e) => {
    setShowEditMessageModal((prev) => !prev);
    setOpen(false);
  };
  const openDeleteMessageModal = (e) => {
    setShowDeleteMessageModal((prev) => !prev);
    setOpen(false);
  };

  function openModal() {
    setOpen(true);
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

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
          positon: "relative",
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
              <CustomMenuItem onClick={(e) => openModalSongForm(e)}>
                <div className="serverModalCategory">Edit</div>
                <EditIcon style={{ color: "white" }} />
                <div className="LoginSongForm">
                  <Modal
                    isOpen={modalIsOpenSongForm}
                    onRequestClose={closeModalSongForm}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <SongForm
                      authenticated={authenticated}
                      setAuthenticated={setAuthenticated}
                      closeModalSongForm={closeModalSongForm}
                    />
                  </Modal>
                </div>
              </CustomMenuItem>
              <CustomMenuItem onClick={(e) => openDeleteMessageModal(e)}>
                <div className="serverModalCategory">Delete</div>
                <DeleteIcon style={{ color: "white" }} />
              </CustomMenuItem>
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
