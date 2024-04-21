import React from "react";
import "./Header.css";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import DoneIcon from "@material-ui/icons/Done";
// import { Link, useHistory } from "react-router-dom";
// import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";

function Header({
  currentPage,
  onProfileClick,
  onHomeClick,
  onEditClick,
  isReadOnly,
}) {
  const rightIcon = () => {
    if (currentPage === "home") {
      return <PersonIcon />;
    } else {
      return <HomeOutlinedIcon />;
    }
  };

  return (
    <div className="header">
      <IconButton
        className="button"
        onClick={currentPage === "home" ? onProfileClick : onHomeClick}
      >
        {currentPage === "home" ? <PersonIcon /> : <HomeOutlinedIcon />}
      </IconButton>
      <h1 className="header__text">Header</h1>
      {currentPage === "profile" && (
        <IconButton className="edit__button" onClick={onEditClick}>
          {isReadOnly ? <EditIcon /> : <DoneIcon className="doneIcon" />}
        </IconButton>
      )}
    </div>
  );
}

export default Header;
