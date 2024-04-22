import React from "react";
import "./Header.css";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import DoneIcon from "@material-ui/icons/Done";
import ExitToAppRounded from "@material-ui/icons/ExitToAppRounded";
// import { Link, useHistory } from "react-router-dom";
// import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";

function Header({
  currentPage,
  onProfileClick,
  onHomeClick,
  onEditClick,
  isReadOnly,
  isLoggedin,
  onLogout,
}) {
  return (
    <div className="header">
      {isLoggedin && (
        <>
          {isLoggedin &&
            currentPage !== "login" &&
            currentPage !== "signup" && (
              <IconButton
                className="button"
                onClick={currentPage === "home" ? onProfileClick : onHomeClick}
              >
                {currentPage === "home" ? <PersonIcon /> : <HomeOutlinedIcon />}
              </IconButton>
            )}
          <h1 className="header__text">Codate</h1>
          {currentPage === "profile" && (
            <IconButton className="edit__button" onClick={onEditClick}>
              {isReadOnly ? <EditIcon /> : <DoneIcon className="doneIcon" />}
            </IconButton>
          )}
          {/* {isLoggedin(
            <IconButton className="button" onClick={onLogout}>
              <ExitToAppRounded />
            </IconButton>
          )} */}
        </>
      )}
    </div>
  );
}

export default Header;
