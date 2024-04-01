import React from "react";
import "./Header.css";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import ForumIcon from "@material-ui/icons/Forum";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import { Link, useHistory } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <IconButton className="button">
        <PersonIcon />
      </IconButton>
      <h1 className="header__text">Header</h1>
      <IconButton className="button">
        {<NotificationsNoneOutlinedIcon />}
      </IconButton>
      {/* {backButton ? (
        <IconButton
          className="header"
          onClick={() => history.replaceState(backButton)}
        >
          <ArrowBackIosIcon fontSize="large" className="header__icon" />
        </IconButton>
      ) : (
        <IconButton>
          <PersonIon fontSize="large" className="header__icon" />
        </IconButton>
      )} */}

      {/* <Link to="/">
        <h1 className="app__name" fontSize="large">
          AppTitle
        </h1>
      </Link>
      <Link to="/chat">
        <IconButton>
          <ForumIcon className="header__icon" fontSize="large" />
        </IconButton>
      </Link> */}
    </div>
  );
}

export default Header;
