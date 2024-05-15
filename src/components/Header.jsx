import React from "react";
import "./Header.css";
// import logo from "../assets/Logo_color.svg";
// import Logo from "./Logo";

import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import DoneIcon from "@material-ui/icons/Done";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Header({
  currentPage,
  onProfileClick,
  onHomeClick,
  onEditClick,
  onSaveClick,
  isReadOnly,
  isLoggedin,
  onLogout,
}) {
  return (
    <div className="header">
      <h1 className="header__text">
        <img src="codate-color.svg" alt="Logo" className="logo"></img>
        Codate
      </h1>
      {isLoggedin && (
        <>
          {isLoggedin &&
            currentPage !== "login" &&
            currentPage !== "signup" && (
              <IconButton
                className="button"
                onClick={currentPage === "home" ? onProfileClick : onHomeClick}
              >
                {currentPage === "home" ? (
                  <PersonIcon className="person__icon" />
                ) : (
                  <HomeOutlinedIcon className="home__icon" />
                )}
              </IconButton>
            )}

          {currentPage === "profile" && (
            <IconButton
              className="button"
              onClick={isReadOnly ? onEditClick : onSaveClick}
            >
              {isReadOnly ? (
                <EditIcon className="edit__icon" />
              ) : (
                <DoneIcon className="done__icon" />
              )}
            </IconButton>
          )}
          {currentPage === "home" ? (
            <IconButton className="button" onClick={onLogout}>
              <ExitToAppIcon className="exit__icon" />
            </IconButton>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default Header;
