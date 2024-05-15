import React, { useState, useEffect } from "react";

import "./TinderCards.css";
// import SwipeButtons from "./SwipeButtons";

function TinderCards({ image }) {
  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {/* <h1>Tinder Cards</h1> */}
        <img className="tinderCards__image" src={image} alt="projectImage" />
      </div>
    </div>
  );
}

export default TinderCards;
