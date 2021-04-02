import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSong } from "../../store/songs";

// to build
// import { getArtist } from "../../store/users";

import { deleteUserComment, getAllLikes } from "../../store/songs";
import CommentForm from "./CommentForm";

import "./CommentForm.css";
