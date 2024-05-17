import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

import "./SwipeButtons.css";

const SwipeButtons = ({ onLikeButtonClick, onDislikeButtonClick }) => {
  return (
    <div className="swipeButtons">
      <IconButton className="swipeButtons__left" onClick={onDislikeButtonClick}>
        <CloseIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButtons__right" onClick={onLikeButtonClick}>
        <FavoriteIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default SwipeButtons;
