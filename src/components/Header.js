import React from "react";
import "./Header.css";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { Link, useHistory } from "react-router-dom";

function Header({ currentPage, onProfileClick, onHomeClick }) {
  return (
    <div className="header">
      <IconButton
        className="button"
        onClick={currentPage === "home" ? onProfileClick : onHomeClick}
      >
        {currentPage === "home" ? <PersonIcon /> : <HomeOutlinedIcon />}
      </IconButton>
      <h1 className="header__text">Header</h1>
      <IconButton className="button">
        {/* {<NotificationsNoneOutlinedIcon />} */}
      </IconButton>
    </div>
  );
}

export default Header;
